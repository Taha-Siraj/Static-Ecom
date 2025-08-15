import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaRegWindowClose } from "react-icons/fa";
import { GlobalContext } from '../Context/Context';
import api from '../Api';
import { Toaster , toast } from 'react-hot-toast';
import { IoMdCloseCircle } from "react-icons/io";
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
      toast.error("Cart fetch error");
      console.log("Cart fetch error:", error)
    }
  }
  useEffect(() => {
    fetchCart()
  }, [])

  const deletedCart  = async (cart_id) => {
    try {
      let res = await api.delete(`/deletedcart/${cart_id}`);
      toast.success("Cart deleted successfully");
      console.log(res.data)
      fetchCart()
    } catch (error) {
      toast.error("Cart delete error");
      console.log("Cart delete error:", error)
    }
  }
  return (
    <div className="h-screen overflow-scroll font-poppins z-50 fixed top-0 right-0 w-full bg-black/40 flex justify-end">
      <Toaster position='bottom-right' />
      <div className="h-full w-[450px] bg-white">
        <div className="flex justify-between p-4">
          <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <FaRegWindowClose
            className="text-2xl text-gray-500 cursor-pointer"
            onClick={onClose}
          />
        </div>
          <hr className='' />
        <br />
        <div className='flex flex-col gap-y-3'>
          {allCart.map((item) =>(
            <div key={item.cart_id} className='flex justify-between items-center px-4 gap-2 w-full'>
              <img src={item.product_image} className='w-[120px] h-[120px]  border  rounded-lg  object-cover' alt="" />
            <div>
                <h1 className='text-[16px] font-semibold'>{item.product_name}</h1>
              <span className='text-md text-black font-bold'> <span className='font-medium'> {item.quantity} X </span>  Rs: {Math.floor(item.price_per_item)}</span>
            </div>
               <button onClick={() => deletedCart(item.cart_id)} className='border py-1 rounded-lg text-gray-500  px-1  text-3xl' ><IoMdCloseCircle /></button>
            </div>
          ))}
        </div>


      </div>
    </div>
  )
}

export default Cart
