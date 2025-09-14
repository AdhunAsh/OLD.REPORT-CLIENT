import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const ProductItem = ({id, image, hoverImage, name, price}) => {
    const { currency } = useContext(ShopContext);
    const [currentImage, setCurrentImage] = useState(image);

    const handleMouseEnter = () => {
        if (hoverImage) {
            setCurrentImage(hoverImage);
        }
    };

    const handleMouseLeave = () => {
        setCurrentImage(image);
    }; 

  return (
    <Link 
        className='block cursor-pointer transition-transform duration-200 hover:scale-105' 
        to={`/product/${id}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
    >
        <div className='overflow-hidden rounded-lg aspect-[9/16] bg-gray-100'>
            <img className='w-full h-full object-cover transition-transform duration-300 hover:scale-105' src={currentImage} alt="" />
        </div>
        <div className='mt-3 space-y-1'>
            <p className='text-sm text-gray-900 font-medium leading-tight'>{name}</p>
            <p className='text-sm text-gray-600'>{currency}{price}</p>
        </div>
    </Link>
  )
}

export default ProductItem
