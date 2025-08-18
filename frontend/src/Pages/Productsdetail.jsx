import React from 'react'
import { FaGreaterThan } from "react-icons/fa";
const Productsdetail = () => {

  
  return (
    <div className='pt-24'>
      <div className='bg-[#F9F1E7] h-28 w-full flex px-10 justify-start gap-x-5 items-center text-center'>
        <p className='text-gray-400 text-xl flex justify-center items-center gap-x-3' >Home <FaGreaterThan className='text-xl text-black'/></p>
        <p className='text-gray-400 text-xl flex justify-center items-center gap-x-3' >Shop <FaGreaterThan className='text-xl text-black'/></p>
        <p className='text-xl font-semibold text-black capitalize'>Product Detailed Page</p>
      </div>
      <div>

      </div>
    </div>
  )
}

export default Productsdetail
