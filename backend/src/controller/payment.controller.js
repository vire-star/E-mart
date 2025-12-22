import { ENV } from "../config/env.js";
import { stripe } from "../config/stripe.js";
import { Order } from "../model/order.model.js";
import { User } from "../model/user.model.js";

export const createCheckoutSession = async(req ,res)=>{
    try {
        const {products} = req.body;

        if(!Array.isArray(products)){
            return res.status(401).json({
                message:"empty products"
            })
        }

        let totalAmount = 0

        const lineItem = products.map((product)=>{
            const amount = Math.round(product.product.price*100)
            totalAmount += amount*product.quantity;

            return {
                price_data:{
                    currency:"usd",
                    product_data:{
                        name:product.product.name,
                        images:[product.product.image]
                    },
                    unit_amount:amount
                },
                quantity:product.quantity||1
            }
        })

// localhost:5173
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items:lineItem,
            mode:'payment',
            success_url:`${ENV.CLIENT_URL}/purchase?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`${ENV.CLIENT_URL}/purchase/cancel`,

            metadata:{
                userId:req.id.toString(),
                products:JSON.stringify(
                    products.map((p)=>({
                        id:p.product._id,
                        quantity:p.quantity,
                        price:p.product.price
                    }))
                )
            }
        })


        return res.status(201).json({
            id:session.id,
            totalAmount:totalAmount/100,
            url:session.url
        })
    } catch (error) {
        console.log(`error from create checkout session , ${error}`)
    }
}


export const checkoutSuccess=async(req,res)=>{
    try {
        const {sessionId} = req.body;
        if(!sessionId){
            return res.status(401).json({
                message:"SessionId not found"
            })
        }

        const existinOrder = await Order.findOne({stripeSessionId:sessionId})
        if(existinOrder){

            return res.status(401).json({
                message:"Order already created"
            })



        }



        const session = await stripe.checkout.sessions.retrieve(sessionId)


        if(session.payment_status==='paid'){
            const products = JSON.parse(session.metadata.products)

            const newOrder =  new Order({
                user:session.metadata.userId,
                products:products.map((product)=>({
                    product:product.id,
                    quantity:product.quantity,
                    price:product.price
                })),
                totalAmount:session.amount_total/100,
                stripeSessionId:sessionId
            })

            await newOrder.save()

            await User.findByIdAndUpdate(
                session.metadata.userId,{
                    $set:{cartItem:[]}
                }
            )

            return res.status(201).json({
                message:"Payment completed"
            })
        }

        return res.status(401).json({
            message:"Payment not completed"
        })

    } catch (error) {

        console.log(`error from checkout success, ${error}`)
    }
}