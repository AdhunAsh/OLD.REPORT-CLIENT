import React, { useContext, useRef, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

const ProductItem = ({id, image, name, price}) => {
    const { currency } = useContext(ShopContext);
    const itemRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(itemRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
    }, []);

    const handleMouseEnter = () => {
        gsap.to(imageRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    }; 

  return (
    <Link 
        ref={itemRef}
        className='text-gray-700 cursor-pointer opacity-0' 
        to={`/product/${id}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        <div className='overflow-hidden'>
            <img ref={imageRef} className='w-full' src={image} alt="" />
        </div>
        <p className='pt-3 pb-1 text-sm'>{name}</p>
        <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem
