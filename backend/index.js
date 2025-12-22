import express from "express";
import { ENV } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import cookieParser from "cookie-parser";
import userRoute from "./src/routes/user.route.js";
import productRoute from "./src/routes/product.route.js";
import cartRoute from "./src/routes/cart.route.js";
import paymentRoute from "./src/routes/payment.route.js";
import analyticRoyte from "./src/routes/analytic.route.js";
import cors from 'cors'
const app = express()


app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/api', userRoute)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/payment', paymentRoute)
app.use('/api/analytic', analyticRoyte)
app.listen(ENV.PORT,()=>{
    connectDB()
    console.log(`server started ${ENV.PORT}`)
})