import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext';

const SliderDesk = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const bestProduct = products.filter(product => product.bestseller);
    setBestSeller(bestProduct);
  }, [products]);

  useEffect(() => {
    if (bestSeller.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % bestSeller.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [bestSeller]);

  return (
    <div className="relative w-4/5 h-4/5 mx-auto my-auto overflow-hidden rounded-2xl shadow-2xl drop-shadow-2xl">
      <div 
        className="flex w-full h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {bestSeller.map((item, index) => (
          <div 
            key={item.id || index} 
            className="w-full h-full flex-shrink-0 relative group"
          >
            <img 
              src={item.images[0].image}
              alt="Best Seller"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            {/* Decorative corner elements */}
            <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-white/30"></div>
            <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-white/30"></div>
            
            {/* Enhanced badge with animation */}
            {/* <div className="absolute bottom-12 left-8 z-10 transform transition-all duration-500 hover:scale-110">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-lg transform rotate-1"></div>
                {/* <h1 className="relative px-8 py-3 text-xl font-bold tracking-widest uppercase bg-white text-black shadow-2xl rounded-lg border-2 border-gray-200 hover:bg-gray-100 transition-colors duration-300">
                  Best Seller
                </h1> */}
              {/* </div>
            </div> */}
            
            {/* Floating elements */}
            <div className="absolute top-1/4 right-12 w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            <div className="absolute top-1/3 right-20 w-1 h-1 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute top-1/2 right-16 w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          </div>
        ))}
      </div>
      
      {/* Enhanced dots navigation */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {bestSeller.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full border-2 ${
              index === currentIndex 
                ? 'w-8 h-3 bg-white border-white' 
                : 'w-3 h-3 bg-white/30 border-white/50 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
      
      {/* Side navigation arrows */}
      {/* <button
        type="button"
        onClick={() => setCurrentIndex(prev => prev === 0 ? bestSeller.length - 1 : prev - 1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20"
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => setCurrentIndex(prev => (prev + 1) % bestSeller.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-20"
      >
        →
      </button> */}
    </div>
  )
}

export default SliderDesk;
