import React from 'react'

const Checkout = () => {
  return (
    <div> 
        <div className="h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <p className="text-gray-600 mb-6">Thank you for your order!</p>
            <p className="text-gray-600 mb-4">Your order has been placed successfully.</p>
            <p className="text-gray-600">You will receive a confirmation email shortly.</p>
            </div>
        </div>
    </div>
  )
}

export default Checkout
