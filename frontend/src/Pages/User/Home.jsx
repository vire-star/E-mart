
import React from 'react'
import FeaturedProducts from './FeaturedProducts'
import { useGetFeaturedProcut } from '@/hooks/product.hook'
import Footer from '@/components/Footer'
import CustomerReview from '@/components/CustomerReview'

const Home = () => {
    // yahan se hum apna getUser hook ko clear kar denge

    const {data} = useGetFeaturedProcut()
    
    
  return (
    <div className='min-h-screen w-full'>
        <div className='h-[60vh] w-full'>
            <img src="/img.jpg" className='w-full h-full object-cover' alt="" />

        </div>

        <div className='min-h-fit w-full '>
          <h1 className='font-semibold text-2xl mx-9 my-6'>Featured Products</h1>
          <div className='flex flex-wrap gap-9 mt-9 mb-8 px-9'>

           {
            data?.map((item,index)=>{
              return(
                <div key={index}>
                   <FeaturedProducts item={item}/>
                </div>
              )
            })
           }
            
          </div>

        </div>
        <CustomerReview/>
        <Footer/>

    </div>
  )
}

export default Home