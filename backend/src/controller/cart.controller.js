import { User } from "../model/user.model.js";

export const addToCart = async(req,res)=>{
    try {
        const {productId}  = req.body;
        const userId = req.id
        const user = await User.findById(userId)

        const exisitItem = user.cartItem.find((item)=>item.product.toString()===productId)

        if(exisitItem){
            return res.status(201).json({
                message:"Product is already in the cart"
            })
        } else{
            user.cartItem.push({quantity:1, product:productId})


        }

        await  user.save()

        return res.status(201).json({
            message:"Product added to your cart successfylly"
        })
        
    } catch (error) {
        console.log(`error from add To cart, ${error}`)
    }
}

export const removeFromCart = async(req, res)=>{
    try {
        const {productId} = req.body;
        const userId = req.id;

        if(!productId){
            return res.status(401).json({
                message:"Product id is not available"
            })
        }


        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({
                message:"user not available"
            })
        }


       await user.updateOne({
            $pull:{cartItem:{product:productId}}
        })
        

        return res.status(201).json({
            message:"Product removed from cart"
        })

    } catch (error) {
        console.log(`error from remove from cart, ${error}`)
    }
}


export const removeAllCart = async(req,res)=>{
    try {
        

        const userId = req.id;

        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({
                message:"User not found"
            })
        }


        user.cartItem =[]

        await user.save()

        return res.status(201).json({
            message:"Cart cleared successfully"
        })
    } catch (error) {
        console.log(`error from remove all cart Item, ${error}`)
    }
}



export const updateProductQuantity = async(req,res)=>{
    try {
        const productId = req.params.id;

        const {operation}  = req.body;

        const userId = req.id;

        const user= await User.findById(userId)

        const item = user.cartItem.find((item)=>item.product.toString()===productId);

        if(!item){
            return res.status(401).json({message:"Product not found"})
        } 

        if(operation ==='increase'){
            item.quantity+=1
        }
        else if(operation ==='decrease'){
            item.quantity-=1

            // agar quantity 0 ho to remove from cart
            if(item.quantity<=0){
            user.cartItem = user.cartItem.filter((p)=>  p.product.toString() !== productId)
        }
        }

         else{
            return res.status(401).json({
                message:"Invalid opeation"
            })
        }

        await user.save()

        return res.status(200).json({
            message: `Product quantity ${operation}d successfully`,
            cartItem: user.cartItem
        });
    } catch (error) {
        console.log(`error from updateProduct Quantity, ${error}`)
    }
}