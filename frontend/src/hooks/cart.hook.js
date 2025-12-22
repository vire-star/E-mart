import { addToCart, removeAllApi, removeFromCartApi, updateQuantityApi } from '@/assets/Api/cart.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useAddToCartHook = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:addToCart,
        onSuccess:(data)=>{
            queryClient.invalidateQueries('getUser')
            toast.success(data.message)
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}


export const useUpdateQuantity=()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:updateQuantityApi,
        onSuccess:(data)=>{
            console.log(data)
            queryClient.invalidateQueries(['getCartItem'])
            toast.success(data.message)
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}


export const useRemoveCartItemHook = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:removeFromCartApi,
        onSuccess:(data)=>{
            toast.success(data.message)
            queryClient.invalidateQueries(['getCartItem'])
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}

export const useClearCartHook = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:removeAllApi,
        onSuccess:(data)=>{
            toast.success(data.message)
             queryClient.invalidateQueries(['getCartItem'])
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}

