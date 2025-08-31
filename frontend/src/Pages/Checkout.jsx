import React, { useContext, useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { GlobalContext } from "../Context/Context";
import api from "../Api"; // Aapka API instance

const Checkout = () => {
  const { state } = useContext(GlobalContext);
  const [allCart, setAllCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      if (!state.user?.user_id) {
        setError("Please log in to view your cart.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await api.get(`/cart/${state.user.user_id}`);
        setAllCart(res.data.cartItems || []);
        setSubtotal(res.data.grandTotal || 0);
        setError(null);
      } catch (err) {
        setError("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [state.user]);

  // Button click par order details console mein show karega
  const handlePlaceOrder = () => {
    const orderDetails = {
        user_id: state.user.user_id,
        order_items: allCart,
        grand_total: subtotal,
    };

    console.log("Placing Order with these details:", orderDetails);
    alert("Order placed! Details console mein check karein.");
  };

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="py-20 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="py-20 bg-gray-50">
      {/* --- Hero Section --- */}
      <div className="relative mb-12">
        <img src="hero2.jpg" className="object-cover w-full h-[250px] md:h-[300px]" alt="Checkout Banner" />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Checkout</h1>
          <p className="text-gray-200 text-sm md:text-lg flex items-center gap-x-2">
            Home <FaGreaterThan size={12} /> <span>Checkout</span>
          </p>
        </div>
      </div>

      {/* --- Sirf Order Summary --- */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {allCart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty.</h2>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">Your Order</h2>
            <div className="space-y-4">
              {allCart.map((item) => (
                <div key={item.cart_id} className="flex justify-between border-b pb-2 text-gray-600">
                  <p>{item.product_name} × {item.quantity}</p>
                  <p>Rs {item.price_per_item * item.quantity}</p>
                </div>
              ))}
              <div className="flex justify-between font-bold text-xl text-gray-900 border-t pt-4">
                <p>Grand Total</p>
                <p>Rs {subtotal}</p>
              </div>
            </div>
            <div className="mt-8">
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700"
              >
                Buy Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;