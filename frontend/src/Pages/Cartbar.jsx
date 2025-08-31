import React, { useContext, useEffect, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { GlobalContext } from "../Context/Context";
import api from "../Api";
import { toast } from "react-hot-toast"; 
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";


const Cart = ({ onClose }) => {
  const { state } = useContext(GlobalContext);
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

  const deletedCart = async (cart_id) => {
    try {
      await api.delete(`/deletedcart/${cart_id}`);
      toast.success("Cart deleted successfully")
      fetchCart();
    } catch (error) {
      toast.error("Cart delete error", { id: "delete-cart" });
      console.log("Cart delete error:", error);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  

  return (
    <div
      className="h-screen fixed top-0 right-0 w-full bg-black/40 z-50 flex justify-end"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full sm:w-[400px] bg-white flex flex-col"
      >
        <div className="px-4">
          <div className="flex justify-between pt-5">
            <h1 className="text-xl sm:text-2xl font-bold">Shopping Cart</h1>
            <FaRegWindowClose
              className="text-2xl text-gray-500 cursor-pointer"
              onClick={onClose}
            />
          </div>
          <hr />
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-y-3 py-3">
          {allCart.length === 0 && (
            <div className="text-center py-4">Your cart is empty</div>
          )}
          {allCart.map((item) => (
            <div
              key={item.cart_id}
              className="flex justify-between items-center px-4 gap-2 w-full"
            >
              <img
                src={item.product_image}
                className="w-20 h-20 sm:w-28 sm:h-28 border rounded-lg object-cover"
                alt={item.product_name}
              />
              <div className="flex-1">
                <h1 className="text-[15px] sm:text-[16px] font-semibold truncate">
                  {item.product_name}
                </h1>
                <span className="text-sm sm:text-md text-black font-bold">
                  <span className="font-medium"> {item.quantity} x </span> Rs:{" "}
                  {Math.floor(item.price_per_item)}
                </span>
              </div>
              <button
                onClick={() => deletedCart(item.cart_id)}
                className="text-gray-500 text-2xl sm:text-3xl"
              >
                <IoMdCloseCircle />
              </button>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 border-t">
          <p className="text-md text-black font-bold">Total: Rs: {subtotal}</p>
        </div>

        {allCart.length > 0 && (
          <div className="p-4 flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/cart"
              className="w-full text-center bg-white rounded-full border-2 capitalize border-black text-black no-underline py-2 px-4"
            >
              Cart
            </Link>
            <Link
              to="/checkout"
              className="w-full text-center bg-black rounded-full border-2 capitalize border-black text-white no-underline py-2 px-4"
            >
              Checkout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
