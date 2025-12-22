import express from "express";
import { protectRoute } from "../middleware/auth.middlware.js";
import { addToCart, removeAllCart, removeFromCart, updateProductQuantity } from "../controller/cart.controller.js";


const cartRoute = express.Router()

cartRoute.post('/addToCart', protectRoute, addToCart)
cartRoute.post('/removeFromCart', protectRoute,removeFromCart)
cartRoute.post('/removeAll', protectRoute, removeAllCart)
cartRoute.post('/updateQuantity/:id', protectRoute, updateProductQuantity)


export default cartRoute