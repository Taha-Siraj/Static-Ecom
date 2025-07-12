import React, { use, useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../Context/Context'
import api from '../Api'

const Cart = () => {
  const {state} = useContext(GlobalContext)
  const [allCartItem , setAllCartItem] = useState([])
  console.log(state.user.user_id)
  const allCart = async () => {
   try {
    let res = await api.get(`/cart/${state.user.user_id}`);
    console.log("all cart" , res.data)
    setAllCartItem(res.data.cartItems)
   } catch (error) {
    console.log("all cart error", error)
   }
  }
  useEffect(() => {
    allCart()
  },[])

  const deletedCart = async (cart_id) => {
    console.log(cart_id)
    try {
      let res = await api.delete(`/deletedcart/${cart_id}`)
      console.log(res.data.message)
       allCart()
    } catch (error) {
      console.log("cart did not deletd" , error.response.data.message)
      
    }
  
  }

  return (
    <div className='pt-24 font-poppins'>
     <div className='flex flex-wrap justify-between gap-2'>
      {allCartItem.map((eachCart) => (
        <div className='border p-3 rounded-lg' key={eachCart?.cart_id}>
          <h1>{eachCart?.price_per_item}</h1>
          <h1>{eachCart?.quantity}</h1>
          <h1>{eachCart?.total_price}</h1>
          <h1>{eachCart?.created_at}</h1>
          <button className='py-2 px-4 rounded-md bg-green-600 text-white capitalize text-xl border font-poppins' onClick={() =>  deletedCart(eachCart?.cart_id)} >deletd Cart</button>
        </div>
      ))}
     </div>
    </div>
  )
}

export default Cart
