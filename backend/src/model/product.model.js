import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        min:0,
        required:true
    },

    image:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    isFeatured:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

productSchema.index({name:"text",description:"text"})

productSchema.index({category:1})
// 1 ka matlab hai ki product in category ascending order mai show hongey

productSchema.index({price:1})

export const Product = mongoose.model("Product", productSchema)