import React, { useContext, useEffect, useState } from "react";
import api from "../Api";
import { GlobalContext } from "../Context/Context";
import { FaGreaterThan } from "react-icons/fa";

const Checkout = () => {
  const { state } = useContext(GlobalContext)
  const [allCart, setAllCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);


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

  return (
    <div className="py-20">
      <div className="relative">
        <img
          src="hero2.jpg"
          className="object-cover w-full h-[250px] md:h-[300px] rounded-lg"
          alt=""
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center text-center px-4 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            Checkout
          </h1>
          <p className="text-gray-200 text-sm md:text-lg flex items-center gap-x-2">
            Home <FaGreaterThan /> <span>Checkout</span>
          </p>
        </div>
      </div>

      <div className="flex py-10 justify-center w-full items-center">
        <div className="w-[40vw]">
        <div className="flex w-full  justify-between">
          <p className="text-2xl font-semibold text-black">Product</p>
          <p className="text-2xl font-semibold text-black">Total</p>
        </div>
        </div>
      </div>

    </div>
  );
};

export default Checkout;
