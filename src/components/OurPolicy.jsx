//for future requirement (if easy exchange policy, 7-days return policy, best customer support is required)
import quality_icon from '../assets/quality_icon.png'
import support_img from '../assets/support_img.png'

const OurPolicy = () => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 gap-10 text-center pt-20 sm:pt-20 pb-10 text-sm md:text-base text-gray-700'>
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

        <div>
            <img src={quality_icon} className="w-12 md:w-16 h-auto object-contain m-auto mb-2" alt="" />
            <p className='font-semibold'>Return Policy</p>
            <p className='text-gray-400'>All sales are final. We do not accept returns or exchanges.</p>
        </div>
        <div>
            <img src= { support_img } className='w-8 md:w-12 m-auto mb-5' alt="" />
            <p className='font-semibold'>Best customer support</p>
            <p className='text-gray-400'>We provide 24/7 customer support</p>
        </div>
    </div>
  )
}

export default OurPolicy