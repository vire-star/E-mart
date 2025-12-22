import { dailySalesApi, dashboardApi } from '@/assets/Api/dashboard.api'
import { useQuery } from '@tanstack/react-query'

export const useGetDashBoardData = ()=>{
    return useQuery({
        queryKey:['dasbhoard-summary'],
        queryFn:dashboardApi
    })
}
export const useGetDailySalesData = (startDate, endDate)=>{
    return useQuery({
        queryKey:['dailySales', startDate, endDate],
        queryFn:()=>dailySalesApi(startDate, endDate),
        enabled:!!startDate&&!!endDate
    })
}