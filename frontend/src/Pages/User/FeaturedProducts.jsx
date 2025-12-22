import React from 'react';

const FeaturedProducts = ({ item }) => {
  return (
    <div className="p-2">
      <div className="group h-[420px] w-72 bg-white rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col">
        
        {/* Image Container */}
        <div className="h-64 w-full flex items-center justify-center bg-gray-50 p-6">
          <img
            src={item?.image}
            className="object-contain h-full w-full group-hover:scale-105 transition-transform duration-300"
            alt={item?.name || 'Product'}
          />
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col justify-between p-6">
          
          {/* Product Info */}
          <div className="space-y-1">
            <h3 className="text-gray-900 font-medium text-base leading-snug line-clamp-2">
              {item?.name}
            </h3>
            <p className="text-3xl font-bold text-gray-900 tracking-tight">
              ${item?.price}
            </p>
          </div>

          {/* CTA Button */}
          <button className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-md transition-colors duration-200 mt-4">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
