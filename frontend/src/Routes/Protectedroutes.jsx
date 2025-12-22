import { useGetProfileHook } from "@/hooks/user.hook"
import { useUserStore } from "@/store/userStore"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({children})=>{
    const setUser = useUserStore((state)=>state.setUser)

    const {data, isLoading} = useGetProfileHook()

    useEffect(()=>{
         if(data){
            setUser(data)
        }
    },[data, setUser])


    if(isLoading){
        return <div>...Loading</div>
    }


    if(!data){
        return <Navigate to={'/login'} replace/> 
    }


    return children

}