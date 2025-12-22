import axios from "axios"

export const createPaymentApi = async(products)=>{
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/createPayment`,
        {products},
        {
            headers:{'Content-Type':"Application/json"},
            withCredentials:true
        }
    )

    return res.data
}


export const createSuccessApi =async(sessionId)=>{

        const res  =await axios.post(`${import.meta.env.VITE_BASE_URL}/payment/create-success`,
            {sessionId},
           {
            headers:{'Content-Type':"Application/json"},
            withCredentials:true
        }
        )

        return res.data
}