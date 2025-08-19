import React, { useContext, useEffect, useState } from 'react'
import { FaGreaterThan } from "react-icons/fa";
import api from '../Api'
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../Context/Context';
import { MdOutlineStarPurple500, MdStarPurple500 } from "react-icons/md";
const Productsdetail = () => {

  const { state, dispatch } = useContext(GlobalContext)
  let { id } = useParams()
  const [Productsdetail, setproductdetails] = useState([])
  const [counter, setcounter] = useState(0)

  const fetchproductdetails = async () => {
    try {
      let res = await api.get('/allproducts');
      let matchproduct = res.data.products.find((item) => String(item.product_id) === String(id))
      console.log(matchproduct)
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
      <div className='bg-[#F9F1E7] h-28 w-full flex px-10 justify-start gap-x-5 items-center text-center'>
        <p className='text-gray-400 text-xl flex justify-center items-center gap-x-3' >Home <FaGreaterThan className='text-xl text-black' /></p>
        <p className='text-gray-400 text-xl flex justify-center items-center gap-x-3' >Shop <FaGreaterThan className='text-xl text-black' /></p>
        <p className='text-xl font-semibold text-black capitalize'>Product Detailed Page</p>
      </div>
      <div className='px-20 w-full py-10 flex items-center justify-center '>
        <div className='w-full flex gap-x-3'>
          <div>
            {[...Array(4)].map((img , index) => (
              <img src={Productsdetail?.product_img} className='hover:border-black border-2 cursor-pointer w-[100px] bg-[#F9F1E7]  rounded-md' alt="" />
            ) ) }
          </div>
          <img src={Productsdetail?.product_img} className='bg-[#F9F1E7] w-[450px] border rounded-md' alt="" />
        </div>
        <div className='w-full'>
          <h1 className='text-2xl font-bold'>{Productsdetail?.product_name}</h1>
          <h1 className='text-2xl  font-bold '>RS: {Productsdetail?.price}</h1>
          <div className='gap-x-3 flex'>
            <div className='flex'>
              {[...Array(5)].map((item) => (
                <MdOutlineStarPurple500 className='text-xl text-[#FACC15]' />
              ))}
            </div>
            <p>{Productsdetail?.customer_reviews} Customer Reviews</p>
          </div>
          <p>{Productsdetail?.description}</p>
          <div className='flex gap-x-3 justify-between'>
            <div className='border rounded-md flex justify-center items-center gap-x-2'>
              <span className='text-2xl hover:bg-gray-200 duration-300 py-2 px-3 cursor-pointer' onClick={() => setcounter(counter - 1)} >-</span>
              {counter}
              <span className='text-2xl hover:bg-gray-200 duration-300 py-2 px-3 cursor-pointer' onClick={() => setcounter(counter + 1)} >+</span>
            </div>
            <button className='bg-black text-white font-semibold px-4 py-2 rounded-md w-full'>Add to cart</button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Productsdetail
