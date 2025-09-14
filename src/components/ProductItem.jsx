import React, { useContext, useRef, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'

const ProductItem = ({id, image, hoverImage, name, price}) => {
    const { currency } = useContext(ShopContext);
    const itemRef = useRef(null);
    const imageRef = useRef(null);
    const [currentImage, setCurrentImage] = useState(image);

    useEffect(() => {
        gsap.fromTo(itemRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );
    }, []);

    const handleMouseEnter = () => {
        if (hoverImage) {
            setCurrentImage(hoverImage);
        }
        gsap.to(imageRef.current, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        setCurrentImage(image);
        gsap.to(imageRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    }; 

  return (
    <Link 
        ref={itemRef}
        className='block cursor-pointer opacity-0' 
        to={`/product/${id}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        <div className='overflow-hidden rounded-lg aspect-[9/16] bg-gray-100'>
            <img ref={imageRef} className='w-full h-full object-cover' src={currentImage} alt="" />
        </div>
        <div className='mt-3 space-y-1'>
            <p className='text-sm text-gray-900 font-medium leading-tight'>{name}</p>
            <p className='text-sm text-gray-600'>{currency}{price}</p>
        </div>
    </Link>
  )
}

export default ProductItem
