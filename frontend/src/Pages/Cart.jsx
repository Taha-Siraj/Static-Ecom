import React, { useRef, useState } from 'react'
import { FaRegWindowClose } from "react-icons/fa";
const Cart = ({onClose}) => {
  return (
     <div className="h-screen z-50 fixed top-0 right-0 w-full bg-black/40 flex justify-end">
      <div className="h-screen w-[450px] bg-white">
        <div className="flex justify-between p-4">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <FaRegWindowClose
            className="text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  )
}

export default Cart
