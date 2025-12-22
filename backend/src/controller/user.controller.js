import { User } from "../model/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ENV } from "../config/env.js";
import cloudinary from "../config/cloudinary.js";
import {Product} from '../model/product.model.js'
export const register =async(req ,res)=>{
    try {
        const {name, password, email} = req.body;

        if(!name || !password || !email){
            return res.status(401).json({
                message:"Please provide all the details"
            })
        }

        const existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(201).json({
                message:"User already exist"
            })
        }


        const hashPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name, 
            email,
            password:hashPassword
        })

        const token  = await jwt.sign({userId:user._id}, ENV.JWT_TOKEN)

        return res.status(201).cookie("token",token,{maxAge:1*24*60*60*1000, http:true,sameSite:"none"}).json({
            message:`welcome ${user.name}`
        })
        
    } catch (error) {
        console.log(`error from register controller, ${error}`)
    }
}


export const login = async(req, res)=>{
    try {
        const {email, password } = req.body;

        if(!email || !password){
            return res.status(401).json({
                message:"Please provide all the details"
            })
        }

        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({
                message:"user does not exist"
            })
        }


        const isPasswordCorrect = bcrypt.compare(password, user.password)

        if(!isPasswordCorrect){
            return res.status(401).json({
                message:"user does not exist"
            })
        }

         const token  = await jwt.sign({userId:user._id}, ENV.JWT_TOKEN)

       if(user.email===ENV.ADMIN_EMAIL){
        
        const token  = await jwt.sign({userId:user._id}, ENV.JWT_TOKEN)
        user.owner = true,
        await user.save()
        return res.status(201).cookie("token",token,{maxAge:1*24*60*60*1000, http:true,sameSite:"none", secure:true}).json({
            message:`welcome back Admin ${user.name}`,
            
            
        })
       }

       return res.status(201).cookie("token",token,{maxAge:1*24*60*60*1000, http:true,sameSite:"none"}).json({
            message:`welcome ${user.name}`
        })


    } catch (error) {
        console.log(`error from login , ${error}`)
    }
}


export const getUser = async(req, res)=>{
    try {
        const userId = req.id;
        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }

        return res.status(201).json(user)
    } catch (error) {
        console.log(`error from getUser, ${error}`)
    }
}


export const getCartItem = async(req,res)=>{
    try {
        const userId = req.id;

        const user = await User.findById(userId).populate({
            path:'cartItem',
            populate:{
                path:'product',
                model:"Product"
            }
        
        }).select('cartItem')

        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }

       return res.status(201).json(user)
    } catch (error) {
        console.log(`error from getCartItem, ${erorr}`)
    }
}



export const updateProfile = async(req,res)=>{
    try {
        const userId = req.id;
        
        const {name} = req.body;
        
        const updateData = {}

        if(name){
            updateData.name = name
        }
        if(req.file){
            const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`

            const uploadRes = await cloudinary.uploader.upload(base64,{
                folder:"ProfilePhoto"
            })

            updateData.profilePhoto = uploadRes.secure_url
        }

        
        const user = await User.findByIdAndUpdate(
            userId,
            updateData,
            {new: true, runValidators:true}
        ).select('-password')

        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }


        return res.status(201).json({
            message:"Profile updated succesfully"
        })


    } catch (error) {
        console.log(`error from updateProfile ,`, error)
    }
}



export const logout = async(req, res)=>{
    try {
         return res.status(201).cookie("token","").json({
            message:`user Logged out successfully`
        })
    } catch (error) {
        console.log(`error from logout`)
    }
}