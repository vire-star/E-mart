import React from 'react'

const FilterProduct = ({category, setcategory, priceRange, setPriceRange, onReset}) => {
  return (
    <div className='hidden lg:block w-[280px] h-screen sticky top-0 bg-white border-r border-gray-200'>
      <div className='p-6'>
        
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-lg font-bold text-gray-900'>Filters</h2>
          {(category || priceRange.min || priceRange.max) && (
            <button 
              className='text-sm font-medium text-blue-600 hover:text-blue-700'
              onClick={onReset}
            >
              Clear all
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className='mb-8 pb-8 border-b border-gray-200'>
          <label className='block text-sm font-semibold text-gray-900 mb-3'>
            Category
          </label>
          <select 
            value={category} 
            onChange={(e) => setcategory(e.target.value)}
            className='w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
          >
            <option value="">All Categories</option>
            <option value="Mens">Men</option>
            <option value="Womens">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className='block text-sm font-semibold text-gray-900 mb-3'>
            Price Range
          </label>
          <div className='space-y-4'>
            <div>
              <label className='block text-xs text-gray-600 mb-1.5'>Minimum</label>
              <input 
                type="number" 
                value={priceRange.min} 
                onChange={(e) => setPriceRange((prev) => ({...prev, min: e.target.value}))}
                placeholder='$ 0'
                className='w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
              />
            </div>
            <div>
              <label className='block text-xs text-gray-600 mb-1.5'>Maximum</label>
              <input 
                type="number" 
                value={priceRange.max} 
                onChange={(e) => setPriceRange((prev) => ({...prev, max: e.target.value}))}
                placeholder='$ 1000'
                className='w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent'
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default FilterProduct
