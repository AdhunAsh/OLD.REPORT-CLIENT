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
    <div className="relative w-full overflow-hidden z-100">
      <div ref={carouselRef} className="flex w-full md:h-[calc(100dvh-83.313px)] lg:h-[calc(100dvh-99.313px)]">
        {bestSeller.map((item, index) => (
          <div 
            key={index} 
            className="w-full h-full flex-shrink-0 relative bg-cover bg-center"
            style={{ backgroundImage: `url(${backendUrl}${item.images[0].image})` }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            
            {/* Badge */}
            <div className="absolute bottom-10 left-10 z-10">
              <h1 className="relative inline-block px-6 py-2 text-lg font-semibold tracking-wider uppercase bg-white/50 text-black shadow-xl rounded-md">
                Best Seller
              </h1>
            </div>
          </div>
        ))}
      </div>
      
      {/* Dots navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {bestSeller.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-200 ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default SliderDesk;
