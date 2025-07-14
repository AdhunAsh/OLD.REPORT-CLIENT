import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { useAuth } from '@clerk/clerk-react';
import axiosInstance from '../axios';
import { toast } from 'react-toastify';

const Orders = () => {

  const { products, currency } = useContext(ShopContext);
  const { getToken } = useAuth();
  const [ orders, setorders ] = useState([])

  const orderData = async () => {
    try {
      
      const token = await getToken();
      const response = await axiosInstance.get('/order-list/', { headers: {
        Authorization: `bearer ${token}`
      }})
      if (response.data){
        console.log(response.data);
        setorders(response.data)
      }
  
    } catch (error) {
      console.log(error);
      toast.error(error)
    }

  }

  useEffect(()=>{
    orderData();
  },[])


  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {
          orders.map((item, index)=>(
            <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src= {item.items.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.items.product}</p>
                  <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                    <p className='text-lg'>{currency}{(item.items.price / 100).toFixed(2)}</p>
                    <p>Quantity: 1</p>
                    <p>Size: M</p>
                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'>26, 09, 2001</span></p>
                </div>
              </ div>
              <div className='md:w-1/2 flex justiy-between'>
                <div className='flex items-center gap-2'>
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='text-sm md:text-base'>Ready to ship</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders

