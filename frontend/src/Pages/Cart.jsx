import React from 'react'
import { FaGreaterThan } from 'react-icons/fa'

const Cart = () => {
  return (
    <>
      <div className="pt-20 w-full">
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

      </div>
    </>
  )
}

export default Cart
