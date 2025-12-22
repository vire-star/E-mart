import React, { useState } from 'react'

const CustomerReview = () => {
  // Sample review data - replace with actual API data
  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      rating: 5,
      date: "2025-11-28",
      title: "Excellent quality!",
      comment: "The product exceeded my expectations. Great quality and fast delivery. Highly recommended!",
      verified: true,
      helpful: 24
    },
    {
      id: 2,
      name: "Priya Patel",
      rating: 4,
      date: "2025-11-25",
      title: "Good value for money",
      comment: "Overall satisfied with the purchase. The fit is perfect and the material is comfortable.",
      verified: true,
      helpful: 18
    },
    {
      id: 3,
      name: "Amit Kumar",
      rating: 5,
      date: "2025-11-20",
      title: "Amazing product",
      comment: "This is my second purchase from this store. Never disappointed with the quality and service.",
      verified: true,
      helpful: 32
    },
    {
      id: 4,
      name: "Sneha Reddy",
      rating: 4,
      date: "2025-11-15",
      title: "Pretty good",
      comment: "Nice product, delivery was on time. Only minor issue was the packaging could be better.",
      verified: false,
      helpful: 12
    }
  ]

  const [filter, setFilter] = useState('all')

  // Calculate rating statistics
  const totalReviews = reviews.length
  const averageRating = (reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews).toFixed(1)
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => 
    reviews.filter(review => review.rating === rating).length
  )

  // Filter reviews
  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(filter))

  // Star rendering function
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
      {/* Section Header */}
      <div className='text-center mb-12'>
        <h2 className='text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-2'>
          Customer Reviews
        </h2>
        <p className='text-gray-600 text-sm'>See what our customers are saying</p>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        
        {/* Left Sidebar - Rating Summary */}
        <div className='lg:col-span-1'>
          <div className='bg-white border border-gray-200 rounded-lg p-6 sticky top-4'>
            {/* Overall Rating */}
            <div className='text-center pb-6 border-b border-gray-200'>
              <div className='text-5xl font-bold text-gray-900 mb-2'>
                {averageRating}
              </div>
              <div className='flex items-center justify-center mb-2'>
                {renderStars(Math.round(averageRating))}
              </div>
              <p className='text-sm text-gray-600'>
                Based on {totalReviews} reviews
              </p>
            </div>

            {/* Rating Breakdown */}
            <div className='pt-6 space-y-3'>
              {[5, 4, 3, 2, 1].map((rating, index) => {
                const count = ratingCounts[index]
                const percentage = (count / totalReviews) * 100
                
                return (
                  <div key={rating} className='flex items-center gap-3'>
                    <button
                      onClick={() => setFilter(rating.toString())}
                      className='flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900'
                    >
                      {rating}
                      <svg className='w-4 h-4 text-yellow-400' fill='currentColor' viewBox='0 0 20 20'>
                        <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                      </svg>
                    </button>
                    <div className='flex-1 h-2 bg-gray-200 rounded-full overflow-hidden'>
                      <div 
                        className='h-full bg-yellow-400 rounded-full'
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className='text-sm text-gray-600 w-8 text-right'>{count}</span>
                  </div>
                )
              })}
            </div>

            {/* Filter Reset */}
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className='w-full mt-6 text-sm text-gray-600 hover:text-gray-900 font-medium'
              >
                Show all reviews
              </button>
            )}

            {/* Write Review Button */}
            <button className='w-full mt-6 bg-black text-white py-3 px-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors'>
              Write a Review
            </button>
          </div>
        </div>

        {/* Right Content - Reviews List */}
        <div className='lg:col-span-2 space-y-6'>
          {filteredReviews.length === 0 ? (
            <div className='text-center py-12 bg-gray-50 rounded-lg border border-gray-200'>
              <p className='text-gray-600'>No reviews found for this rating</p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div key={review.id} className='bg-white border border-gray-200 rounded-lg p-6'>
                {/* Review Header */}
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex items-center gap-3'>
                    {/* User Avatar */}
                    <div className='w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-semibold text-lg'>
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-semibold text-gray-900'>{review.name}</h3>
                        {review.verified && (
                          <span className='inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800'>
                            ✓ Verified
                          </span>
                        )}
                      </div>
                      <p className='text-sm text-gray-500'>
                        {new Date(review.date).toLocaleDateString('en-IN', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className='flex items-center mb-3'>
                  {renderStars(review.rating)}
                </div>

                {/* Review Title */}
                <h4 className='font-semibold text-gray-900 mb-2'>
                  {review.title}
                </h4>

                {/* Review Comment */}
                <p className='text-gray-700 leading-relaxed mb-4'>
                  {review.comment}
                </p>

                {/* Review Footer */}
                <div className='flex items-center gap-4 pt-4 border-t border-gray-200'>
                  <button className='flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900'>
                    <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' />
                    </svg>
                    Helpful ({review.helpful})
                  </button>
                  <button className='text-sm text-gray-600 hover:text-gray-900'>
                    Report
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerReview
