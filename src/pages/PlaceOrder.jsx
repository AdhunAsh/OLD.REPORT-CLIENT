import React, { useContext } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { ShopContext } from '../context/ShopContext'
import { useState } from 'react'
import axios from "axios";
import { toast } from 'react-toastify'
import { backendUrl } from '../../..//src/App'

const PlaceOrder = () => {
  const { navigate } = useContext(ShopContext);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    street: "",
    pincode: "",
    city: "",
    state: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post( `${backendUrl}/api/orders/`, formData);
      toast.success("order successfully placed")
      navigate("/orders");
    } catch (err) {
      toast.error("Order failed!");
    }
  };

  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input name="firstName" value={form.firstName} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input name="lastName" value={form.lastName} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />
        </div>
        <input name="email" value={form.email} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input name="address" value={form.address} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Flat, House No, Building, Company, Apartment' />
        <div className='flex gap-3'>
          <input name="street" value={form.street} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
          <input name="pincode" value={form.pincode} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='PinCode' />
        </div>
        <div className='flex gap-3'>
          <input name="city" value={form.city} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input name="state" value={form.state} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <input name="phone" value={form.phone} onChange={handleChange} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
      </div>

      {/* right side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />
          {/* Payment method selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div className='flex items-center gap-33 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3.5 h-3.5 border rounded-full`}></p>
              <img className='h-5 mx-4' src="logo" alt="" />
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button
              type="button"
              onClick={handlePlaceOrder}
              className='bg-black text-white px-16 py-3 text-sm active:bg-gray-600'
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaceOrder