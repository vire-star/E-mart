import { configDotenv } from 'dotenv'
import { Product } from './src/model/product.model.js'

configDotenv({})

import mongoose from 'mongoose'
import { faker } from '@faker-js/faker';

const categories = [ 'Kids', 'Mens', 'Womens'];
const names =['Shirt', 'Pant', 'Jacket','Jeans', 'Saree', 'Shoes']
const imageMap = {
   
    'Kids': 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400',
    'Mens': 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400',
    'Womens': 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400',
  };


  const generateProducts = (count)=>{
    const products=[]

    for(let i= 0; i<count; i++){
        const category = faker.helpers.arrayElement(categories)
        products.push({
      name: faker.helpers.arrayElement(names),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price({ min: 500, max: 5000 })),
        category: category, // ✅ Ab yeh defined hai
      image: imageMap[category], // ✅ Ab yeh bhi kaam karega
      isFeatured: false, 
      createdAt: faker.date.past(),
    });
    }

    return products
  }


  const seeDatabase= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`mongodb connected`)

        await Product.deleteMany({})
        console.log(`🗑️ product deleted`)

        const products = generateProducts(10000)

        await Product.insertMany(products)
        console.log(`successfully added 10000 products`)

        process.exit(0)
    } catch (error) {
        console.log(`error from seeding, ${error}`)
        process.exit(1)
    }
  }


  seeDatabase()