import { Spinner } from '@/components/ui/spinner'
import { useClearCartHook, useRemoveCartItemHook, useUpdateQuantity } from '@/hooks/cart.hook'
import { useCreatePaymentHook } from '@/hooks/payment.hook'
import { useGetUserCartItemHook } from '@/hooks/user.hook'
import { Trash2, ShoppingBag } from 'lucide-react'
import React from 'react'

const CartPage = () => {
  const {data} = useGetUserCartItemHook()

  const totalAmount = data?.cartItem?.reduce(
    (sum, item) => sum + (item.product.price * item.quantity), 0
  ) || 0
   
  const {mutate: removeAll} = useClearCartHook()
  const {mutate} = useUpdateQuantity()
  const {mutate: deleteFromCart} = useRemoveCartItemHook()
  const {mutate: payment, isPending} = useCreatePaymentHook()

  const clearCartItemAll = () => {
    removeAll()
  }

  const updateCartItemIncrease = (id) => {
    mutate({
      productId: id,
      operation: "increase"
    })
  }

  const updateCartItemDecrease = (id) => {
    mutate({
      productId: id,
      operation: "decrease"
    })
  }

  const deleteProduct = (id) => {
    deleteFromCart({
      productId: id
    })
  }

  const paymentBag = () => {
    const products = data?.cartItem?.map((item) => ({
      product: {
        _id: item._id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image,
      },
      quantity: item.quantity
    }))
    payment(products)
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-[1400px] mx-auto px-4 lg:px-8'>
        
        {/* Page Header */}
        <div className='mb-6'>
          <h1 className='text-3xl font-bold text-gray-900'>Shopping Cart</h1>
          <p className='text-sm text-gray-600 mt-1'>
            {data?.cartItem?.length || 0} {data?.cartItem?.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className='flex flex-col lg:flex-row gap-6'>
          
          {/* Cart Items Section */}
          <div className='flex-1 space-y-4'>
            {data?.cartItem?.length === 0 ? (
              <div className='bg-white rounded-lg p-12 text-center'>
                <ShoppingBag className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                <h2 className='text-xl font-semibold text-gray-900 mb-2'>Your cart is empty</h2>
                <p className='text-gray-600'>Add some products to get started</p>
              </div>
            ) : (
              data?.cartItem?.map((item, index) => {
                return (
                  <div key={index} className='bg-white rounded-lg border border-gray-200 p-4 lg:p-6 hover:shadow-md transition-shadow'>
                    <div className='flex flex-col sm:flex-row gap-4'>
                      
                      {/* Product Image */}
                      <div className='w-full sm:w-32 h-32 bg-gray-50 rounded-md overflow-hidden flex-shrink-0'>
                        <img 
                          src={item.product.image} 
                          className='w-full h-full object-contain' 
                          alt={item.product.name} 
                        />
                      </div>

                      {/* Product Details & Actions */}
                      <div className='flex-1 flex flex-col sm:flex-row justify-between gap-4'>
                        
                        {/* Product Info */}
                        <div className='space-y-1'>
                          <h3 className='text-base font-semibold text-gray-900 leading-tight'>
                            {item.product.name}
                          </h3>
                          <p className='text-2xl font-bold text-gray-900'>
                            ${item.product.price}
                          </p>
                        </div>

                        {/* Quantity Controls & Delete */}
                        <div className='flex items-center gap-4'>
                          
                          {/* Quantity Selector */}
                          <div className='flex items-center gap-2 border border-gray-300 rounded-md'>
                            <button
                              onClick={() => updateCartItemDecrease(item.product._id)}
                              disabled={item.quantity <= 1}
                              className='w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                            >
                              −
                            </button>
                            <span className='w-12 text-center text-sm font-medium text-gray-900'>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartItemIncrease(item.product._id)}
                              className='w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors'
                            >
                              +
                            </button>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => deleteProduct(item.product._id)}
                            className='p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors'
                            aria-label='Remove item'
                          >
                            <Trash2 className='w-5 h-5' />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className='lg:w-96'>
            <div className='bg-white rounded-lg border border-gray-200 p-6 sticky top-24'>
              
              <h2 className='text-lg font-bold text-gray-900 mb-4'>Order Summary</h2>
              
              <div className='space-y-3 mb-6 pb-6 border-b border-gray-200'>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Subtotal</span>
                  <span className='font-semibold text-gray-900'>${totalAmount.toFixed(2)}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Items</span>
                  <span className='font-semibold text-gray-900'>{data?.cartItem?.length || 0}</span>
                </div>
                <div className='flex justify-between text-sm'>
                  <span className='text-gray-600'>Shipping</span>
                  <span className='font-semibold text-green-600'>Free</span>
                </div>
              </div>

              <div className='flex justify-between mb-6'>
                <span className='text-base font-semibold text-gray-900'>Total</span>
                <span className='text-2xl font-bold text-gray-900'>${totalAmount.toFixed(2)}</span>
              </div>

              {/* CTA Buttons */}
              <div className='space-y-3'>
                <button 
                  onClick={paymentBag}
                  disabled={!data?.cartItem?.length || isPending}
                  className='w-full h-12 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                >
                  {isPending ? <Spinner /> : "Proceed to Checkout"}
                </button>

                {data?.cartItem?.length > 0 && (
                  <button 
                    onClick={clearCartItemAll}
                    className='w-full h-12 bg-white hover:bg-gray-50 text-gray-900 font-medium border border-gray-300 rounded-md transition-colors'
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage
