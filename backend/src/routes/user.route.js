import express from 'express'
import { getCartItem, getUser, login, logout, register, updateProfile } from '../controller/user.controller.js'
import { protectRoute } from '../middleware/auth.middlware.js'
import { upload } from '../middleware/uploadImage.js'


const userRoute = express.Router()


userRoute.post('/register', register)
userRoute.post('/login', login)
userRoute.get('/getUser', protectRoute, getUser)
userRoute.post('/updateProfile', protectRoute, upload.single('profilePhoto'), updateProfile)
userRoute.get('/getCartItem', protectRoute, getCartItem)
userRoute.post('/logout', protectRoute, logout)

export default userRoute