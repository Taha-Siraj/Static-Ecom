import React, { useContext, useEffect, useState } from "react";
import { FaGreaterThan, FaSpinner } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { GlobalContext } from "../Context/Context";
import api from "../Api"; // Aapka API instance

// Stripe publishable key ko .env file mein rakhein
const stripePromise = loadStripe('YOUR_STRIPE_PUBLISHABLE_KEY');

const Checkout = () => {
  const { state } = useContext(GlobalContext);
  const [allCart, setAllCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false); // Payment processing state

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "Pakistan",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    phone: "",
    email: state.user?.email || "", // User context se email lein agar hai
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        console.error("Cart fetch error:", err);
        setError("Failed to load cart items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [state.user]);

  const handlePayment = async () => {
    // Basic validation
    for (const key in formData) {
        if (!formData[key]) {
            alert(`Please fill out the ${key} field.`);
            return;
        }
    }
    
    setProcessing(true);
    try {
      // Step 1: Backend se session ID create karein
      const response = await api.post("/create-checkout-session", {
        cartItems: allCart,
        customer_email: formData.email,
      });

      const { sessionId } = response.data;

      // Step 2: Stripe Checkout pe redirect karein
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe redirect error:", error);
        alert("Payment failed. Please try again.");
      }
    } catch (err) {
      console.error("Payment processing error:", err);
      alert("Could not initiate payment. Please check your details and try again.");
    } finally {
        setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-gray-700" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center text-red-500 text-xl">{error}</div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      {/* --- Hero Section --- */}
      <div className="relative mb-12">
        <img
          src="hero2.jpg"
          className="object-cover w-full h-[250px] md:h-[300px]"
          alt="Checkout Banner"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            Checkout
          </h1>
          <p className="text-gray-200 text-sm md:text-lg flex items-center gap-x-2">
            Home <FaGreaterThan size={12} /> <span>Checkout</span>
          </p>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {allCart.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty.</h2>
            <p className="text-gray-500 mt-2">Looks like you haven't added anything to your cart yet.</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* --- Billing Details Form (Left Side) --- */}
            <div className="w-full lg:w-2/3 bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                Billing Details
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input type="text" name="address" id="address" value={formData.address} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                 <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input type="text" name="city" id="city" value={formData.city} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input type="text" name="postalCode" id="postalCode" value={formData.postalCode} onChange={handleInputChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>
              </form>
            </div>

            {/* --- Order Summary (Right Side) --- */}
            <div className="w-full lg:w-1/3">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
                        Your Order
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between font-semibold text-gray-800">
                            <p>Product</p>
                            <p>Total</p>
                        </div>
                        {allCart.map((item) => (
                            <div key={item.cart_id} className="flex justify-between border-b pb-2 text-gray-600">
                                <p>{item.product_name} × {item.quantity}</p>
                                <p>Rs {item.price_per_item * item.quantity}</p>
                            </div>
                        ))}
                        <div className="flex justify-between font-semibold text-gray-800 pt-4">
                            <p>Subtotal</p>
                            <p>Rs {subtotal}</p>
                        </div>
                        <div className="flex justify-between font-bold text-xl text-gray-900 border-t pt-4">
                            <p>Grand Total</p>
                            <p>Rs {subtotal}</p>
                        </div>
                    </div>
                    <div className="mt-8">
                        <button
                            onClick={handlePayment}
                            disabled={processing}
                            className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {processing ? (
                                <>
                                    <FaSpinner className="animate-spin mr-2" />
                                    Processing...
                                </>
                            ) : (
                                "Proceed to Payment"
                            )}
                        </button>
                    </div>
                </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;