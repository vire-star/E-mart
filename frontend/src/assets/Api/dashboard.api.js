import axios from "axios"

export const dashboardApi = async()=>{
    const res   = await axios.get(`${import.meta.env.VITE_BASE_URL}/analytic/getDate`,
        {
            headers:{'Content-Type':'Application/json'},
            withCredentials:true
        }
    )

    return res.data
}

export const dailySalesApi = async(startDate, endDate)=>{
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/analytic/dailySales`,{
        params:{startDate,endDate},
        withCredentials:true
    })

    return res.data
}