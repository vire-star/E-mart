import { useGetAllProductHook } from '@/hooks/product.hook'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from './ui/spinner'

const AllProducts = ({page, setpage, activeSearch, category, priceRange},) => {
  const {data, isLoading} = useGetAllProductHook({
    page,
    search:activeSearch,
    category:category,
     minPrice: priceRange.min,
  maxPrice: priceRange.max
  })
  const navigate = useNavigate()
  
  if(isLoading){
    return <div className='h-screen text-3xl w-full flex items-center justify-center'><Spinner/></div>
  }
 
  const navigateSingleProduct = (id) => {
    navigate(`/product/${id}`)
  }

  return (
    <div className='min-h-screen w-full lg:w-[80%] flex flex-col justify-between bg-white'>
      
      {/* Products Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8'>
        {data?.products.map((item, index) => {
          return(
            <div 
              key={index}
              onClick={() => navigateSingleProduct(item._id)} 
              className='group cursor-pointer bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-[380px]'
            >
              {/* Image Container */}
              <div className='w-full h-[240px] bg-gray-50 overflow-hidden'>
                <img 
                  src={item.image} 
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                  alt={item.name} 
                />
              </div>

              {/* Product Info */}
              <div className='flex-1 flex flex-col justify-between p-4'>
                <div className='space-y-2'>
                  <h3 className='text-gray-900 font-medium text-base leading-tight line-clamp-2'>
                    {item.name}
                  </h3>
                  <p className='text-2xl font-bold text-gray-900'>
                    ${item.price}
                  </p>
                </div>
                
                <div className='mt-3'>
                  <span className='inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-md'>
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      <div className='flex items-center justify-center gap-6 py-8 border-t border-gray-200'>
        <button 
          disabled={page === 1}
          onClick={() => setpage((prev) => prev - 1)}
          className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
            page === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          Previous
        </button>

        <div className='flex items-center gap-2 text-sm'>
          <span className='font-semibold text-gray-900'>{data?.page}</span>
          <span className='text-gray-500'>of</span>
          <span className='font-semibold text-gray-900'>{data?.totalPages}</span>
        </div>

        <button 
          disabled={!data?.hasMore}
          onClick={() => setpage((prev) => prev + 1)}
          className={`px-6 py-2 text-sm font-medium rounded-md transition-colors ${
            !data?.hasMore 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-900 text-white hover:bg-gray-800'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AllProducts
