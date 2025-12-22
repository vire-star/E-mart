import { getCartItem, getUser, loginApi, logoutApi, registerApi, updateProfile } from "@/assets/Api/user.api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


export const useRegisterHook = ()=>{
    const navigate = useNavigate()
    return useMutation({
        mutationFn:registerApi,
        onSuccess:(data)=>{
            console.log(data)
             toast.success(data.message)
             navigate('/')
        },
        onError:(err)=>{
            toast.error(err.response.data.message)
        }
    })
}



export const useLoginHook = ()=>{
    const navigate = useNavigate()
    return useMutation({
        mutationFn:loginApi,
        onSuccess:(data)=>{
            console.log(data)
            toast.success(data.message)
            navigate('/')
        },
        onError:(err)=>{
            toast.error(err.response.data.message)
        }
    })
}

export const useLogoutHook = ()=>{
    const navigate = useNavigate()
    const  queryClient = useQueryClient()
    return useMutation({
        mutationFn:logoutApi,
        onSuccess:(data)=>{
            
            toast.success(data.message)
            queryClient.invalidateQueries('getUser')
            navigate('/login')
        },
        onError:(err)=>{
            toast.error(err.response.data.message)
        }
    })
}



export const useUpdateProfileHook = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:updateProfile,
        onSuccess:(data)=>{
            toast.success(data.message)
            console.log(data)
            queryClient.invalidateQueries('getUser')
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}


export const useGetProfileHook = ()=>{
    return useQuery({
        queryFn:getUser,
        queryKey:['getUser'],
        retry:false,
        
    })
}

export const useGetUserCartItemHook = ()=>{
    return useQuery({
        queryFn:getCartItem,
        queryKey:['getCartItem'],
        retry:false,
        
    })
}


