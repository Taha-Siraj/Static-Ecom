import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaRegWindowClose } from "react-icons/fa";
import { GlobalContext } from '../Context/Context';
import api from '../Api';
import { Toaster , toast } from 'react-hot-toast';
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
const Cart = ({ onClose }) => {
  const { state, dispatch } = useContext(GlobalContext);
  const [allCart, setAllCart] = useState([]);
  const [subtotal , setsubtotal] = useState(0)
  console.log("Caert user", state)

  const fetchCart = async () => {
    try {
      let res = await api.get(`/cart/${state.user.user_id}`);
      console.log(res.data)
      setAllCart(res.data.cartItems)
      setsubtotal(res.data.grandTotal)

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
    <div className="h-screen overflow-scroll font-poppins z-50 fixed top-0 right-0 w-full bg-black/40 flex justify-end" onClick={onClose}>
      <Toaster position='bottom-right' />
      <div onClick={(e) => e.stopPropagation()} className="h-full w-[400px] bg-white flex justify-between flex-col">
        <div className='px-4'>
          <div  className="flex justify-between pt-5">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
          <FaRegWindowClose
            className="text-2xl text-gray-500 cursor-pointer"
            onClick={onClose}
          />
          </div>
        <hr />
        </div>
        <div className='flex flex-col gap-y-3'>
          {allCart.length === 0 && <div className='text-center py-4'>Your cart is empty</div>}
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
        <div className='px-10'>
            <p className='text-md text-black font-bold'>Total: Rs: {subtotal} </p>
        </div>
        <div className='p-4 '>
          <Link to="/cart" className='bg-white rounded-full border-2 capitalize border-black text-black no-underline py-2 px-4 '>cart</Link>
          <Link to="/cart" className='bg-white rounded-full border-2 capitalize border-black text-black no-underline py-2 px-4 '>cart</Link>
        </div>
      </div>
    </div>
  )
}

export default Cart
