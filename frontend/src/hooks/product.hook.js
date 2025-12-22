import { createProductApi, deleteProductApi, getAllProductApi, getFeaturedProductApi, getSingleProductApi, toggleProductApi } from "@/assets/Api/product.api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useCreateProduct = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:createProductApi,
        onSuccess:(data)=>{
            toast.success("Product created")
            queryClient.invalidateQueries('getAllProduct')
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}


export const useGetAllProductHook = ({
  page = 1,
  limit = 20,
  search = "",
  category = "",
  minPrice = "",
  maxPrice = ""
} = {}) => {
  return useQuery({
    queryKey: [
      'getAllProduct',
      page,
      limit,
      search,
      category,
      minPrice,
      maxPrice
    ],
    queryFn: () =>
      getAllProductApi({
        page,
        limit,
        search,
        category,
        minPrice,
        maxPrice
      }),
    keepPreviousData: true
  });
};

export const useDeleteProductApi = ()=>{
    return useMutation({
        mutationFn:deleteProductApi,
        onSuccess:(data)=>{
            console.log(data)
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}


export const useToggleProduct = ()=>{
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:toggleProductApi,

        onSuccess:(data)=>{

             queryClient.invalidateQueries(['getAllProduct'])
             toast.success("Product Toggled successfully")
        

            console.log(data)
        },
        onError:(err)=>{
            console.log(err)
        }
    })
}


export const useGetSingleProduct=(id)=>{
    return useQuery({
        queryFn:()=>getSingleProductApi(id),
        queryKey:['getSingleProduct',id]
    })
}
export const useGetFeaturedProcut=()=>{
    return useQuery({
        queryFn:getFeaturedProductApi,
        queryKey:['getFeatured']
    })
}