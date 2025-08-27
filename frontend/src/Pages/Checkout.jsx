import React, { useContext, useEffect, useState } from "react";
import api from "../Api";
import { GlobalContext } from "../Context/Context";

const Checkout = () => {
  const {state } = useContext(GlobalContext)
  const [allCart, setAllCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "cod", 
  });

  // Fetch cart
  const fetchCart = async () => {
    try {
      let res = await api.get(`/cart/${state.user.user_id}`);
      setAllCart(res.data.cartItems || []);
      setSubtotal(res.data.grandTotal || 0);
    } catch (error) {
      console.log("Cart fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Pay Now click
  const handlePayNow = async () => {
    try {
      const orderData = {
        user_id: state.user.user_id,
        cartItems: allCart,
        subtotal,
        customer: formData,
      };

      let res = await api.post("/orders", orderData);

      if (res.data.success) {
        alert("Payment Successful & Order Placed!");
        window.location.href = "/thank-you";
      } else {
        alert("Something went wrong!");
      }
    } catch (error) {
      console.log("Order error:", error);
      alert("Order failed, try again.");
    }
  };

  return (
    <div className="min-h-screen  py-28 bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        {/* Cart Summary */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Order Summary</h3>
          {allCart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between border-b py-2 text-gray-700"
            >
              <p>{item.productName} (x{item.quantity})</p>
              <p>Rs. {item.price * item.quantity}</p>
            </div>
          ))}
          <div className="flex justify-between font-bold text-lg mt-3">
            <p>Total:</p>
            <p>Rs. {subtotal}</p>
          </div>
        </div>

        {/* Customer Info */}
        <div className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          />
          <select
            name="payment"
            className="w-full p-2 border rounded"
            onChange={handleChange}
          >
            <option value="cod">Cash on Delivery</option>
            <option value="card">Credit/Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        {/* Pay Now Button */}
        <button
          onClick={handlePayNow}
          className="mt-6 w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
