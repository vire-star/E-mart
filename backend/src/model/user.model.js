import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    owner:{
        type:Boolean,
        default:false
    },
    profilePhoto:{
        type:String
    },


    cartItem:[
        {
            quantity:{
                type:Number,
                default:1
            },
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product"
            }
        }
    ]
},{timestamps:true})

export const User = mongoose.model("User", userSchema)

// owner kon hoga 
// owner rahoge tum 
// agar tumne apni email id se login kiya toh owner ki value true ho jayegi warna owner ki value false hogi
// isko isliye use kar rahey hai taki frontend mai jo value/funtionality owner k liye hain woh sirf owner ko he show hongi