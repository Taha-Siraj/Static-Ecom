import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../Context/Context'
import api from '../Api'
import { toast, Toaster } from 'react-hot-toast'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { state, dispatch } = useContext(GlobalContext)
  const [allCartItem, setAllCartItem] = useState([])

  const allCart = async () => {
    try {
      let res = await api.get(`/cart/${state.user.user_id}`)
      setAllCartItem(res.data.cartItems)
    } catch (error) {
      console.log("all cart error", error)
    }
  }


  console.log("allCartItem" , allCartItem)
  

  useEffect(() => {
    allCart()
  }, [])

  const deletedCart = async (cart_id) => {
    try {
      await api.delete(`/deletedcart/${cart_id}`)
      dispatch({ type: "SET_CART_COUNT", payload: state.cartCount - 1 })
      toast.success("Product removed from cart")
      allCart()
    } catch (error) {
      console.log("Delete error", error.response?.data?.message)
    }
  }

  const handlequantity = async (eachCart, type) => {
    const currentquantity = eachCart?.quantity;
    const newquantity = type === "increase" ? currentquantity + 1 : currentquantity - 1;
    if (newquantity < 1) {
      toast.warning("Quantity can't be less than 1");
      return;
    }

    const updatedCartItem = {
      ...eachCart,
      quantity: newquantity,
      total_price: eachCart.price_per_item * newquantity
    }

    try {
      await updatedCart(updatedCartItem)
      await allCart()
      toast.success("Quantity updated!")
    } catch (error) {
      console.error("Quantity update error", error)
      toast.error("Failed to update quantity")
    }
  }

  const updatedCart = async (updatedCartItem) => {
    const { quantity, price_per_item, cart_id } = updatedCartItem;
    if (!quantity || !price_per_item) {
      toast.warning("All fields are required")
      return;
    }

    try {
      await api.put(`updatedcart/${cart_id}`, {
        price_per_item,
        quantity,
      })
    } catch (error) {
      console.log("cart update error", error)
    }
  }

  const subtotal = allCartItem.reduce((acc, item) => acc + Number(item.total_price), 0);
  const shipping = 200;
  const total = subtotal + shipping;



  return (
    <div className='pt-24 font-poppins px-4 md:px-8 lg:px-16 py-8 bg-gray-50 min-h-[calc(100vh-6rem)]'>
      <Toaster position="top-center" richColors closeButton />
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center md:text-left">Your Shopping Cart</h1>

      {(allCartItem.length === 0) ?(
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl shadow-md">
          <p className="text-xl text-gray-600 mb-6">Your cart is currently empty.</p>
          <Link
            to="/product"
            className="bg-green-700 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            Start Shopping
          </Link>
        </div>
      ): (
         <div className='flex flex-col gap-3 md:flex-row sm:gap-x-5'>
        <div className='w-full lg:w-2/3 bg-white rounded-xl shadow-lg p-6 divide-y divide-gray-200'>
          {allCartItem.map((eachCart) => (
            <div className='border-b flex justify-between px-3 py-3 items-center gap-x-2' key={eachCart?.cart_id}>
              <div className='flex justify-center items-center gap-x-5'>
                <img src={eachCart?.product_image} className='h-[120px] w-[120px] rounded-md' alt="" />
                <div>
                  <h4 className='underline'>{eachCart?.product_name}</h4>
                  <p className='text-sm text-gray-500'>{eachCart?.product_category}</p>
                  <p className='text-green-600 font-bold'>RS: {eachCart?.price_per_item}</p>
                </div>
              </div>

              <div className='flex justify-center items-center gap-x-2'>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handlequantity(eachCart, "decrease")}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-md transition">
                    <FaMinus />
                  </button>
                  <span className="px-4 py-2 text-lg font-medium text-gray-800">
                    {eachCart.quantity}
                  </span>
                  <button
                    onClick={() => handlequantity(eachCart, "increase")}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-md transition">
                    <FaPlus />
                  </button>
                </div>
                <p className='text-xl font-semibold text-black'>RS: {Number(eachCart?.total_price).toFixed(2)}</p>
                <span className='flex justify-center mb-3 items-center p-2 hover:bg-red-100 rounded-full'>
                  <FaTrash className='cursor-pointer text-xl text-red-500 hover:text-red-600'
                    onClick={() => deletedCart(eachCart?.cart_id)} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className='w-full lg:w-1/3 bg-white flex flex-col rounded-xl shadow-lg p-6 sticky top-28'>
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">Order Summary</h2>
          <div className="flex flex-col gap-3 text-lg text-gray-700">
            <div className='flex justify-between'>
              <p>Subtotal:</p>
              <span>RS: {subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between'>
              <p>Shipping:</p>
              <span>RS: {shipping.toFixed(2)}</span>
            </div>
            <div className='flex justify-between font-bold text-black'>
              <p>Total:</p>
              <span>RS: {total.toFixed(2)}</span>
            </div>
             <Link to={'/checkout'} className='bg-green-700 py-3 px-4 w-full rounded-md text-white text-center no-underline font-bold capitalize mt-4'> Proceed to Checkout </Link>
        
            <Link to={'/product'} className='mt-2 text-blue-600 text-center'>Continue Shopping</Link>
          </div>
        </div>
      </div>
      )}
     
    </div>
  )
}

export default Cart
