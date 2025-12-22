import { useAddToCartHook } from '@/hooks/cart.hook'
import { useGetSingleProduct } from '@/hooks/product.hook'
import { Spinner } from '@/components/ui/spinner'
import React from 'react'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
  const {id} = useParams()
  const {data} = useGetSingleProduct(id)
  
  const {mutate, isPending} = useAddToCartHook()
  
  const addTocartFunction = (id) => {
    mutate({productId: id})
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-6xl mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          
          {/* Product Image */}
          <div className='w-full h-[500px] bg-gray-50 rounded-lg overflow-hidden'>
            <img 
              src={data?.image} 
              alt={data?.name}
              className='w-full h-full object-contain'
            />
          </div>

          {/* Product Details */}
          <div className='flex flex-col justify-center space-y-6'>
            
            {/* Category Badge */}
            <span className='text-sm font-medium text-gray-600 uppercase tracking-wide'>
              {data?.category}
            </span>

            {/* Product Name */}
            <h1 className='text-4xl font-bold text-gray-900 leading-tight'>
              {data?.name}
            </h1>

            {/* Price */}
            <p className='text-3xl font-bold text-gray-900'>
              ${data?.price}
            </p>

            {/* Description */}
            <p className='text-base text-gray-600 leading-relaxed border-t border-gray-200 pt-6'>
              {data?.description}
            </p>

            {/* Add to Cart Button */}
            <button 
              onClick={() => addTocartFunction(data?._id)}
              disabled={isPending}
              className='w-full lg:w-auto px-12 py-4 bg-gray-900 hover:bg-gray-800 text-white text-base font-medium rounded-md transition-colors disabled:opacity-50 flex items-center justify-center'
            >
              {isPending ? <Spinner /> : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleProduct
