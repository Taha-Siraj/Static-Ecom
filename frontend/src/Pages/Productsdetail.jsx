import React, { useContext, useEffect, useState } from 'react'
import { FaGreaterThan } from "react-icons/fa";
import api from '../Api'
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../Context/Context';
import { MdOutlineStarPurple500 } from "react-icons/md";

const Productsdetail = () => {
  const { state, dispatch } = useContext(GlobalContext)
  let { id } = useParams()
  const [Productsdetail, setproductdetails] = useState([])
  const [counter, setcounter] = useState(0)

  const fetchproductdetails = async () => {
    try {
      let res = await api.get('/allproducts');
      let matchproduct = res.data.products.find((item) => String(item.product_id) === String(id))
      setproductdetails(matchproduct)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchproductdetails()
  }, [])
 console.log(Productsdetail)
  return (
    <div className='pt-24 font-poppins w-full'>
      {/* Breadcrumb */}
      <div className='bg-[#F9F1E7] h-28 w-full flex px-4 md:px-10 justify-start gap-x-5 items-center'>
        <p className='text-gray-400 text-sm md:text-xl flex items-center gap-x-2' >
          Home <FaGreaterThan className='text-black' />
        </p>
        <p className='text-gray-400 text-sm md:text-xl flex items-center gap-x-2' >
          Shop <FaGreaterThan className='text-black' />
        </p>
        <p className='text-sm md:text-xl font-semibold text-black capitalize'>Product Detailed Page</p>
      </div>

      {/* Main Section */}
      <div className='px-4 md:px-20 w-full py-10 flex flex-col lg:flex-row items-start gap-10'>
        
        {/* Left Images */}
        <div className='w-full lg:w-1/2 flex flex-col md:flex-row gap-5'>
          {/* Small thumbnails */}
          <div className='flex md:flex-col gap-3 justify-center md:justify-start'>
            {[...Array(4)].map((img, index) => (
              <img 
                key={index} 
                src={Productsdetail?.product_img} 
                className='hover:border-black border-2 cursor-pointer w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover bg-[#F9F1E7] rounded-md' 
                alt="" 
              />
            ))}
          </div>
          {/* Main image */}
          <img 
            src={Productsdetail?.product_img} 
            className='bg-[#F9F1E7] w-full md:w-[400px] lg:w-[450px] h-[350px] md:h-[450px] object-contain border rounded-md' 
            alt="" 
          />
        </div>

        {/* Right Content */}
        <div className='w-full lg:w-1/2 flex flex-col gap-y-4'>
          <h1 className='text-xl md:text-2xl font-bold'>{Productsdetail?.product_name}</h1>
          <h1 className='text-lg md:text-2xl font-bold '>RS: {Productsdetail?.price}</h1>
          
          {/* Ratings */}
          <div className='flex items-center gap-x-3'>
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <MdOutlineStarPurple500 key={i} className='text-lg md:text-xl text-[#FACC15]' />
              ))}
            </div>
            <p className='text-sm md:text-base'>{Productsdetail?.customer_reviews} Customer Reviews</p>
          </div>

          {/* Description */}
          <p className='text-sm md:text-base'>{Productsdetail?.description}</p>

          {/* Counter & Button */}
          <div className='flex flex-col sm:flex-row gap-3 border-b pb-6'>
            <div className='border rounded-md flex justify-center items-center gap-x-2'>
              <span 
                className='text-xl md:text-2xl hover:bg-gray-200 duration-300 py-2 px-3 cursor-pointer' 
                onClick={() => setcounter(counter > 0 ? counter - 1 : 0)} 
              >-</span>
              {counter}
              <span 
                className='text-xl md:text-2xl hover:bg-gray-200 duration-300 py-2 px-3 cursor-pointer' 
                onClick={() => setcounter(counter + 1)} 
              >+</span>
            </div>
            <button className='bg-black text-white font-semibold px-4 py-2 rounded-md w-full sm:w-auto'>
              Add to cart
            </button>
          </div>
          <div>
         <p>Category:  {Productsdetail?.category_name}</p>
          </div>
            
        </div>
      </div>
    </div>
  )
}

export default Productsdetail
