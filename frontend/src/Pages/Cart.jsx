import React from 'react'
import { Link } from 'react-router-dom'

const Cart = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Shopping Cart</h1>
      <p className="text-gray-600 mb-4">Your cart is currently empty.</p>
      <div className="flex justify-between items-center">
        <Link to="/product" className="bg-blue-500 text-white py-2 px-4 rounded">
          Continue Shopping
        </Link>
        <Link to="/checkout" className="bg-green-500 text-white py-2 px-4 rounded">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default Cart
