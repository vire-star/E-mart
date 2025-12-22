import AllProducts from '@/components/AllProducts'
import FilterProduct from '@/components/FilterProduct'
import ProductSearchBar from '@/components/ProductSearchBar'
import React, { useState } from 'react'

const Product = () => {
  const [page, setpage] = useState(1)
  const [searchInput, setsearchInput] = useState("")
  const [activeSearch, setactiveSearch] = useState("")
  const [category, setcategory] = useState("")
  const [price, setprice] = useState({min:"", max:""})

  const handleSearchSubmit = (e)=>{
    e.preventDefault()
    setpage(1)
    setactiveSearch(searchInput)
    setsearchInput("")
  }

  const handleCategoryChange = (e)=>{
    setpage(1)
    setcategory(e)
  }
 
  const resetFormHandler =()=>{
    setsearchInput("")
    setactiveSearch("")
    setcategory("")
    setprice({min:"", max:""})
  }

  console.log(activeSearch)
  return (
    <div className='min-h-screen bg-gray-50'>
      <ProductSearchBar
        searchInput={searchInput}
        setsearchInput={setsearchInput}
        onSearchSubmit={handleSearchSubmit}
      />
      <div className='flex max-w-[1400px] mx-auto'>
        <FilterProduct
          category={category}
          setcategory={handleCategoryChange}
          priceRange={price}
          setPriceRange={setprice}
          onReset={resetFormHandler}
        />
        <AllProducts
          page={page}
          setpage={setpage}
          activeSearch={activeSearch}
          category={category}
          priceRange={price}
        />
      </div>
    </div>
  )
}

export default Product
