import React, { useContext, useEffect, useState } from 'react'
import { FaGreaterThan } from 'react-icons/fa'
import { MdDelete } from "react-icons/md";
import { GlobalContext } from '../Context/Context';
import api from '../Api';

const Cart = () => {

  const {state , dispatch} = useContext(GlobalContext)
  const [counter, setCounter] = useState(1);
  const [allCart , setallCart] = useState([])
  const [TotalPrice , setTotalPrice] = useState("")

  
  const fetchCart = async () => {
      try {
        let res = await api.get(`/cart/${state.user.user_id}`);
        setallCart(res.data.cartItems)
        console.log(res.data)
        setTotalPrice(res.data.grandTotal)
      } catch (error) {
        console.log("Cart fetch error:", error);
      }
    };
  
    useEffect(() => {
      fetchCart();
    }, []);


  


  return (
    <>
      <div className="pt-20 w-full font-poppins">
        <div className="relative">
          <img
            src="hero2.jpg"
            className="object-cover w-full h-[300px] md:h-[350px]"
            alt=""
          />

          <div className="absolute top-0 left-0 w-full h-full bg-[#E4E2DF]/40 backdrop-blur-sm flex flex-col justify-center items-center text-center px-4">
            <h1 className="text-4xl md:text-6xl font-semibold text-black mb-4">
              Cart
            </h1>

            <p className="text-gray-700 text-sm md:text-xl flex items-center gap-x-2">
              Home <FaGreaterThan /> <span>Cart</span>
            </p>
          </div>
        </div>

        <div className='flex p-10 gap-x-1'>
          <div className='flex w-full  justify-between flex-col gap-y-5 gap-x-10'>
            <div className='bg-[#F9F1E7]  h-16 px-10 text-xl font-semibold flex w-full items-center justify-between '>
              <li className='list-none'>Product</li>
              <li className='list-none'>Price</li>
              <li className='list-none'>Quantity</li>
            </div>


            {allCart.map((eachCat) => (
                <div className='flex items-center justify-between border-b pb-2'>
              
              <div className='flex justify-center gap-x-2 items-center'>
                <img src={eachCat.product_image} width={100} className='rounded-md' alt="" />
                <p className='m-0'>{eachCat.product_name}</p>
              </div>
              <div>
                <p>RS: {eachCat.price_per_item}</p>
              </div>
              <div className='border text-xl flex justify-between gap-x-1 items-center  rounded-md'>
                <span onClick={() => { counter > 1 ? setCounter(counter - 1) : null }} className='text-xl md:text-2xl hover:bg-gray-200 duration-300 py-2 px-3 cursor-pointer'>-</span>
                {eachCat.quantity}
                <span onClick={() => setCounter(counter + 1)} className='text-xl md:text-2xl hover:bg-gray-200 duration-300 py-2 px-3 cursor-pointer'>+</span>
              </div>
              <div className='flex'>
                <MdDelete className='text-3xl text-[#000000]' />
              </div>
            </div>
              ))}

            
          </div>

        </div>
        <div className='bg-[#F9F1E7] flex flex-col rounded-md justify-center  px-3 w-full capitalize'>
          <h1 className='text-xl  pt-3 text-center font-semibold'>Cart Totals</h1>
          <div className=''>
            {allCart.map((eachcat) => (
              <p className='flex justify-between'>{eachcat.product_name}<span>{Math.floor(eachcat.price_per_item)} X {eachcat.quantity}</span>  </p>
            ))}
          </div>
          <div className='border-t py-2'>
            <p className='flex justify-between'>Total <span>{TotalPrice}</span> </p>
            <button className='w-full py-2 px-1 bg-white rounded-md text-xl font-semibold border text-black  '>Check Out</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart
