import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Slider = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/collection");
    };

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
    <div className="w-full relative h-[80vh] overflow-hidden">
        <div 
            className="flex h-full transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
            {bestSeller.map((item, index) => (
                <div 
                    key={item.id || index} 
                    className="w-full h-full flex-shrink-0 relative bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.images[0].image})` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                    
                    <div className="flex items-center justify-center h-full">
                        <button 
                            type="button"
                            onClick={handleClick} 
                            className="relative z-50 border-2 border-white text-white px-8 py-3 text-lg font-medium hover:bg-white hover:text-black transition-all duration-300"
                        >
                            SHOP NOW
                        </button>
                    </div>
                </div>
            ))}
        </div>
        
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

export default Slider