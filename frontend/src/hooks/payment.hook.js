import { createPaymentApi, createSuccessApi } from '@/assets/Api/payment.api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'


export const useCreatePaymentHook = ()=>{
    return useMutation({
        mutationFn:createPaymentApi,
        onSuccess:(data)=>{
            console.log(data)
            window.location.href=data.url
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}


export const useCreateSuccessHook = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:createSuccessApi,
        onSuccess:(data)=>{
            queryClient.invalidateQueries(['getCartItem'])
            toast.success(data.message)
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}