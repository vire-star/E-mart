import axios from "axios"

export const registerApi = async(paylod)=>{
    const res =  await axios.post(`${import.meta.env.VITE_BASE_URL}/register`,
        paylod,
        {
            headers:{'Content-Type':'Application/json'},
            withCredentials:true
        }
    )

    return res.data
}





export const loginApi = async(paylod)=>{
    const res =  await axios.post(`${import.meta.env.VITE_BASE_URL}/login`,
        paylod,
        {
            headers:{'Content-Type':'Application/json'},
            withCredentials:true
        }
    )

    return res.data
}

export const logoutApi = async()=>{
    const res =  await axios.post(`${import.meta.env.VITE_BASE_URL}/logout`,
        {},
        {
            headers:{'Content-Type':'Application/json'},
            withCredentials:true
        }
    )

    return res.data
}




export const updateProfile = async(paylod)=>{
    const res =  await axios.post(`${import.meta.env.VITE_BASE_URL}/updateProfile`,
        paylod,
        {
            headers:{'Content-Type':'multipart/form-data'},
            withCredentials:true
        }
    )

    return res.data
}



export const getUser = async()=>{
    const res =  await axios.get(`${import.meta.env.VITE_BASE_URL}/getUser`,
        
        {
            headers:{'Content-Type':'Application/json'},
            withCredentials:true
        }
    )

    return res.data
}

export const getCartItem = async()=>{
    const res =  await axios.get(`${import.meta.env.VITE_BASE_URL}/getCartItem`,
        
        {
            headers:{'Content-Type':'Application/json'},
            withCredentials:true
        }
    )

    return res.data
}