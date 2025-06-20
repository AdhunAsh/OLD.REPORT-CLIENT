import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import dropdown_icon from '../assets/dropdown_icon.png'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
 
const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [category, setCategory] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sortSize, setSortSize] = useState('relevent');

  // if men ,women and kids collection is added, then use this
  // const toggleCategory = (e) =>{
  //   if(subCategory.includes(e.target.value)) {
  //     setCategory(prev => prev.filter(item => item !== e.target.value))
  //   }
  //   else {
  //     setCategory(prev => [...prev, e.target.value])
  //   }
  // }

  const toggleSizes = (e) =>{
    if(sizes.includes(e.target.value)) {
      setSizes(prev => prev.filter(item => item !== e.target.value))
    }
    else {
      setSizes(prev => [...prev, e.target.value])
    }
  }

  const applyFilters = () => {
    let productsToFilter = products.slice();
    if (sizes.length > 0) {
      productsToFilter = productsToFilter.filter( item => item.sizes.some(size => sizes.includes(size)) )
    }

    if(showSearch && search) {
      productsToFilter = productsToFilter.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    setFilteredProducts(productsToFilter);
  }

  const sortProducts = () => {
    let fpCopy = filteredProducts.slice();
    switch (sortSize) {
      case 'low-high':
        setFilteredProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;
      case 'high-low':
        setFilteredProducts(fpCopy.sort((a,b)=>(b.price - a.price)));
        break;
      default:
        applyFilters();
        break;
    }
  }


  useEffect(() => {
    applyFilters();
  },[sizes, search, showSearch])

  useEffect(()=> {
    sortProducts();
  },[sortSize])


  return (
    <div className='flex flex-cols sm:flex-grow gap-1 sm:gap-10 pt-10 border-t'>
      {/* Left side */}
      {/* filter option */}
      <div className='min-w-60'>
        <p onClick={()=>{
          setShowFilter(!showFilter)
        }} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className= {`h-3 sm:hidden ${showFilter ? 'roate-90' : '' }`} src= {dropdown_icon} alt="" />
        </p>
        {/* category filter --- for future use, if u add dress collection for men, women and kids.. */}
        {/* <div className= {`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden' } sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value = {'MEN'}/>MEN
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value = {'WOMEN'}/>WOMEN
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value = {'KIDS'}/>KIDS
            </p>
          </div>
        </div> */}

        {/* subCategory Filters */}
        {/* <div className= {`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden' } sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value = {'Topwear'}/>Topwear
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value = {'Bottomwear'}/>Bottomwear
            </p>
          </div>
        </div> */}

        {/* size category */}

        <div className= {`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden' } sm:block`}>
          <p className='mb-3 text-sm font-medium'>SIZES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {/* if needed */}
            {/* <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value = {'XS'}/>XS
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value = {'S'}/>S
            </p> */}
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value = {'M'} onChange={ toggleSizes }/>M
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value = {'L'} onChange={ toggleSizes }/>L
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type='checkbox' value = {'XL'} onChange={ toggleSizes }/>XL
            </p>
          </div>
        </div>

      </div>

      {/* Right side */}

      <div className='flex-1'>
        <div className='flex justify-between text-base smtext-2xl mb-4'>
            <Title text1={"ALL"} text2={"COLLECTIONS"} />
            {/* product sorting */}
            <select onChange={(e)=> setSortSize(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
        </div>

        {/* map products */}

        <div className='grid grid-cols-2 md:grid-cols-3 ld:grid-cols-4 gap-4 gap-y-6'>
              {
                filteredProducts.map((item,index)=>(
                  <ProductItem key= { index } id= { item._id } image={ item.image } name= { item.name } price= { item.price }/>
                ))
              }
        </div>     
      </div>

    </div>
  )
}

export default Collection