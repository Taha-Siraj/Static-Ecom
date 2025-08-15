import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaRegWindowClose } from "react-icons/fa";
import { GlobalContext } from '../Context/Context';
import api from '../Api';
const Cart = ({ onClose }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [allCart, setAllCart] = useState([]);
  console.log("Caert user", state)

  const fetchCart = async () => {
    try {
      let res = await api.get(`/cart/${state.user.user_id}`);
      console.log(res.data)
      setAllCart(res.data.cartItems)
    } catch (error) {
      console.log("Cart fetch error:", error)
    }
  }
  useEffect(() => {
    fetchCart()
  }, [])
  return (
    <div className="h-screen font-poppins z-50 fixed top-0 right-0 w-full bg-black/40 flex justify-end">
      <div className="h-screen w-[450px] bg-white">
        <div className="flex justify-between p-4">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <FaRegWindowClose
            className="text-2xl cursor-pointer"
            onClick={onClose}
          />
        </div>
        <br />
        <div className='flex flex-col gap-y-3'>
          {allCart.map((item) =>(
            <div key={item.cart_id} className='flex justify-start items-center px-4 gap-3 w-full'>
              <img src={item.product_image} className='w-[120px] h-[120px]  border  rounded-lg  object-cover' alt="" />
            <div>
                <h1 className='text-[16px] font-semibold'>{item.product_name}</h1>
              <span className='text-md text-black font-bold'> <span className='font-medium'> {item.quantity} X </span>  Rs: {Math.floor(item.price_per_item)}</span>
            </div>
            </div>
          ))}
        </div>


      </div>
    </div>
  )
}

export default Cart
