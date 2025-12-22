import { GoogleGenerativeAI } from "@google/generative-ai";
import cloudinary from "../config/cloudinary.js";
import { redis } from "../config/redis.js";
import { Product } from "../model/product.model.js";
import { ENV } from "../config/env.js";



const genAI = new GoogleGenerativeAI(ENV.GEMINI_API_KEY)
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash"})
export const createProduct = async(req ,res)=>{
    try {
        const {name, description, price, category} = req.body;

        if(!name || !description || !price || !category){
            return res.status(401).json({
                message:"Please provide all the details"
            })
        }
        let imageUrl =''
        if(req.file){
             const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`

             const uploadRes = await cloudinary.uploader.upload(base64,{
                folder:"Product"
             })

             imageUrl  =uploadRes.secure_url
        }

        const product = await Product.create({
            name,
            category,
            price,
            description,
            image:imageUrl
        })

        const keys = await redis.keys("products:*")

        if(keys.length>0){
            await redis.del(...keys) 
        }

        return res.status(201).json(product)

    } catch (error) {
        console.log(error,"From create product controller")
    }
}



export const getProductController = async(req,res)=>{
    try {
        const page = parseInt(req.query.page ??"1", 10)
        const limit = parseInt(req.query.limit?? "20",10)
        const skip = (page-1 )*limit


        // skip ka use isliye kiya let's say user abhi first page par hai toh 
        // skip on first page,page =1 
        // let's say user abhi first page par hai toh usko sirf 20 product he show hongey lekin ab user shift ho gaya next page par toh ab usko previous page par job bhi product woh ho nhi hongey unko hum skip kar denge
        // ab user hai page 2 par toh pehle 20 products skip ho jaayenge aur next 20 producst show hongey


        // page 1 par sirf 20 products show honge
        // page 2 par next 20 producst show hongey uar pehle k 20 products skip ho jaayenge
        // then page 3 par next 20 products show hongey and past k 40 products skip ho jaayenge
        // and so on...

        const {search, category, minPrice, maxPrice} = req.query


         const prompt = `You are an intelligent assistant for an E-commerce platform. A user will type any query about what they want. Your task is to understand the intent and return most relevant keyword from the following list of categories:
- Jeans
- Pants
- Shirt
- Jacket
- Saree
- Shoes

Only reply with one single keyword from the list above that best matches the query. Do not explain anything. No extra text. Query: "${search}"`;


        let aiText = null

        if(search && search.trim() !==""){
            const result  = await model.generateContent(prompt)
            aiText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().replace(/[`"\n]/g, "") || ""
        }


        let aiCategory = category

        const mongoQuery = {}

        // Jeans 
        // jeans
        if(aiText){
            mongoQuery.$or=[
                {name:{$regex:aiText, $options:"i"}},
                {description:{$regex:aiText, $options:"i"}}
            ]
        }

        console.log(aiText)
        if(category){
            mongoQuery.category = category
        }
        
        if(minPrice || maxPrice){
            mongoQuery.price={}

            if(minPrice) mongoQuery.price.$gte = Number(minPrice)
            if(maxPrice) mongoQuery.price.$lte = Number(maxPrice)
        }

        // cache key based par filter and pagination lagana hai 


        const cacheKey = `products:${JSON.stringify({
            page,
            limit,
            search:aiText??"",
            category:aiCategory??"",
            minPrice:minPrice??"",
            maxPrice:maxPrice??""
        })}`


        const  cached = await redis.get(cacheKey)

        if(cached){
            const data = typeof cached==='string'?JSON.parse(cached):cached

            return res.status(200).json({fromCached:true, ...data})

        }


        const [item, total]=await Promise.all([
            Product.find(mongoQuery).skip(skip).limit(limit).lean(),
            Product.countDocuments(mongoQuery)
        ])


        if(!item || item.length===0){
            const emptyPayload={
                products:[],
                page,
                limit,
                total:0,
                hasMore:false,
                appliedFilters:{
                    search:aiText,
                    category:aiCategory,
                    minPrice,
                    maxPrice
                }
            }

            await redis.set(cacheKey, JSON.stringify(emptyPayload))
            return res.status(200).json({fromCached:false, ...emptyPayload})
        }


        // calculate pages

        const totalPages = Math.ceil(total/limit)
        const hasMore = page < totalPages

        const payload={
            products:item,
            page,
            limit,
            total,
            totalPages,
            hasMore,
            appliedFilters:{
                search:aiText,
                category:aiCategory,
                minPrice,
                maxPrice
            }
        }


        await redis.set(cacheKey, JSON.stringify(payload), {ex:600})


        return res.status(201).json({fromCached:false, ...payload})



    } catch (error) {
        console.log(`error from getPRoduct controller, ${error}`)
    }
}




export const getFeatureProduct=async(req,res)=>{
    try {
        const featuredProducts = await Product.find({isFeatured:true})

        if(!featuredProducts){
            return res.status(401).json({
                message:"No products found"
            })
        }



        return res.status(201).json(featuredProducts)
    } catch (error) {
        console.log(`error from get feature product`)
    }
}

export const toggleFeatureProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    product.isFeatured = !product.isFeatured
    await product.save()

    return res.status(200).json({
      message: "Product toggled successfully",
      product
    })
  } catch (error) {
    console.log("toggle error:", error)
    res.status(500).json({ message: "Server error" })
  }
}




export const deleteProduct = async(req,res)=>{
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId)

        if(!product){
            return res.status(401).json({
                message:"Product not found"
            })
        }

        if(product.image){
            const publicId  = product.image.split("/").pop().split(".")[0]
            try {
                await cloudinary.uploader.destroy(`Product/${publicId}`)
                console.log(`cloudinary imge delted`)
            } catch (error) {
                console.log(`error from deleting image, ${error
                    }`)
            }
        }



        await Product.findByIdAndDelete(req.params.id)

        const keys = await redis.keys('products:*')

        if(keys.length>0){
            await redis.del(...keys)
        }


        return res.status(201).json({
            message:"Product delted succesfully"
        })
    } catch (error) {
        console.log(`error from delte PRoduct`)
    }
}


export const getSingleProduct = async(req,res)=>{
    try {
        const productId = req.params.id
        const product = await  Product.findById(productId)

        if(!product){
            return res.status(401).json({
                message:"Product not found"
            })
        }

        return res.status(201).json(product)
    } catch (error) {
        console.log(`error from get single Product, ${error}`)
    }
}