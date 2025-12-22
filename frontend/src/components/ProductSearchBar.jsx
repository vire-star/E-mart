import React from 'react'

const ProductSearchBar = ({searchInput, setsearchInput, onSearchSubmit}) => {
  return (
    <div className='w-full h-[240px] bg-gradient-to-b from-gray-100 to-gray-50 flex items-center justify-center border-b border-gray-200'>
      <div className='text-center space-y-6'>
        <h1 className='text-4xl font-bold text-gray-900'>
          Discover Products
        </h1>
        
        <form onSubmit={onSearchSubmit} className='flex items-center max-w-2xl mx-auto'>
          <input 
            type="text" 
            placeholder='Search products...' 
            className='flex-1 px-6 py-3.5 border border-gray-300 rounded-l-lg text-base focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
            value={searchInput} 
            onChange={(e) => setsearchInput(e.target.value)}
          />
          <button 
            type='submit' 
            className='px-8 py-3.5 bg-gray-900 text-white font-medium rounded-r-lg hover:bg-gray-800 transition-colors'
          >
            Search
          </button>
        </form>
      </div>
    </div>
  )
}

export default ProductSearchBar
