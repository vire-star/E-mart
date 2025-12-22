import express from 'express'
import { protectRoute } from '../middleware/auth.middlware.js'
import { checkoutSuccess, createCheckoutSession } from '../controller/payment.controller.js'


const paymentRoute  = express.Router()


paymentRoute.post('/createPayment', protectRoute, createCheckoutSession)
paymentRoute.post('/create-success', protectRoute, checkoutSuccess)

export default paymentRoute