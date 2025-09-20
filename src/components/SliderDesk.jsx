import React, { useContext, useRef, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { gsap } from 'gsap';

const SliderDesk = () => {
  const { products, backendUrl } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  useEffect(() => {
    if (carouselRef.current && bestSeller.length > 0) {
      gsap.to(carouselRef.current, {
        x: -currentIndex * 100 + '%',
        duration: 0.8,
        ease: 'power2.out'
      });
    }
  }, [currentIndex]);

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
            
            {/* Animated Badge */}
            <div className="absolute bottom-10 left-10 z-10">
              <h1 
                className="relative inline-block px-6 py-2 text-lg font-semibold tracking-wider uppercase 
                           bg-white/50 text-black shadow-xl rounded-md"
                ref={el => {
                  if (el) {
                    gsap.fromTo(
                      el,
                      { y: 40, opacity: 0 },
                      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
                    );
                  }
                }}
              >
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
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default SliderDesk;
