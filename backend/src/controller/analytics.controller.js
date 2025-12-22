import { Order } from "../model/order.model.js"
import { Product } from "../model/product.model.js"
import { User } from "../model/user.model.js"

export  const getData = async()=>{
    const totalUser = await User.countDocuments()
    const totalProducts= await Product.countDocuments()

    const salesData= await Order.aggregate([
        {
            $group:{
                _id:null, // it groups all document together,
                totalSales : {$sum:1},
                totalRevenue:{$sum:"$totalAmount" }

            }
        }
    ])
// yaha par ek he index milegi which is 0 index
    const {totalSales, totalRevenue} = salesData[0]|| {totalSales:0, totalRevenue:0}


    return {
        users:totalUser,
        products:totalProducts,
        totalSales,
        totalRevenue,
    }
}


// maan lo humare total sales hai 3
// har product ke liye usko ek value denge 1
// like product 1: 1
// product 2:1
// product 3 :1
// total sales = product1 + product2 + product3 = 1+1+1= 3
// total revenue product1+ product3 + product2 = 100+200+500= 800


export const getAnalyticsController=async(req,res)=>{
    try {
        const data = await getData()
        return res.status(200).json(data)
    } catch (error) {
        console.log(`error from getAnalutics controller, ${error}`)
    }
}


export const getDailySalesData = async(startDate, endDate)=>{
    try {
        const dailySales = await Order.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:startDate,
                        $lte:endDate
                    }
                }
            },
            {
                $group:{
                    _id:{$dateToString:{format:"%Y-%m-%d", date:"$createdAt"}},
                    sales:{$sum:1},
                    revenue:{$sum:"$totalAmount"}
                }
            },
            {$sort:{_id:1}}
        ])


        const dateArray = getDatesInRange(startDate, endDate)


        return dateArray.map((date)=>{
            const foundDate  = dailySales.find((item)=>item._id ===date)

            return {
                date, 
                sales:foundDate?.sales||0,
                revenue:foundDate?.revenue||0
            }
        })
    } catch (error) {
        console.log(`error from get daily sales data, ${error}`)
    }
}


function getDatesInRange(startDate, endDate){
    const dates=[];
    let currentDate = new Date(startDate)

    while(currentDate<= endDate){
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate()+1)
    }

    return dates
}





export const getDailySalesController =async(req, res)=>{
    try {
        const {startDate, endDate} = req.query;

        if(!startDate || !endDate){
            return res.status(401).json({
                message:"Please provide dates"
            })
        }


        const start = new Date(startDate)
        const end = new Date(endDate)

        const data = await getDailySalesData(start, end)

        return res.status(201).json(data)
    } catch (error) {
        console.log(`error from getDaily sales controleer, ${error.b}`)
    }
}