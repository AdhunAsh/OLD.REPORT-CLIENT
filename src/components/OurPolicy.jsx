//for future requirement (if easy exchange policy, 7-days return policy, best customer support is required)

import ReturnPolicy from './ReturnPolicy'
import exchange_icon from '../assets/exchange_icon.png'
import quality_icon from '../assets/quality_icon.png'
import support_img from '../assets/support_img.png'

const OurPolicy = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-10 text-center py-20 text-sm md:text-base text-gray-700'>
        {/* <div>
            <img src= {exchange_icon} className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We offer hassle free exchange policy</p>
        </div> */}
        {/* <div>
            <img src= { quality_icon } className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Return and Exchange Policy</p>
            <p className='text-gray-400'>Orders once done cannot be cancelled.<br/>
            No Exchange! No Return! No Refund!.<br />
            Replacement will be applicable if damaged or defected products recieved, unboxing video of the product is a must for authentication</p>
        </div> */}

        <ReturnPolicy />
        <div>
            <img src= { support_img } className='w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Best customer support</p>
            <p className='text-gray-400'>We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy