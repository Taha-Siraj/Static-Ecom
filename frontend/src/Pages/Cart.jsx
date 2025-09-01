import React, { useContext, useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GlobalContext } from "../Context/Context";
import api from "../Api";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { state } = useContext(GlobalContext);
  const [allCart, setAllCart] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  

  // Fetch Cart
  const fetchCart = async () => {
    try {
      let res = await api.get(`/cart/${state.user.user_id}`);
      setAllCart(res.data.cartItems);

      // frontend se calculate
      const total = res.data.cartItems.reduce(
        (sum, item) => sum + item.quantity * item.price_per_item,
        0
      );
      setGrandTotal(total);
    } catch (error) {
      console.log("Cart fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Delete cart item
  const deleteCart = async (cart) => {
    try {
      let res = await api.delete(`/deletedcart/${cart.cart_id}`);
      toast.success(res?.data?.message);
      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  // Update cart item
  const updateCart = async (cart_id, newQty, price) => {
    try {
      if (newQty < 1) return;
      await api.put(`/updatedcart/${cart_id}`, {
        quantity: newQty,
        price_per_item: price,
      });
      fetchCart();
      toast.success("Cart updated");
    } catch (error) {
      console.log(error);
    }
  };

 

    return (
      <>
        <Toaster position="bottom-right" />
        <div className="pt-20 w-full font-poppins">
          {/* Banner */}
          <div className="relative">
            <img
              src="hero2.jpg"
              className="object-cover w-full h-[250px] md:h-[300px] rounded-lg"
              alt=""
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center text-center px-4 rounded-lg">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
                Your Cart
              </h1>
              <p className="text-gray-200 text-sm md:text-lg flex items-center gap-x-2">
                Home <FaGreaterThan /> <span>Cart</span>
              </p>
            </div>
          </div>

          {/* Cart Section */}
          <div className="flex flex-col md:flex-row gap-6 px-6 py-10">
            {/* Cart Items */}
            <div className="flex-1 bg-white shadow-md rounded-lg p-4 md:p-6">
              {/* Header Row */}
              <div className="hidden md:flex justify-between font-semibold text-lg border-b pb-2 mb-4">
                <span className="w-1/3">Product</span>
                <span className="w-1/6 text-center">Price</span>
                <span className="w-1/6 text-center">Quantity</span>
                <span className="w-1/6 text-center">Action</span>
              </div>

              {allCart.length === 0 ? (
                <p className="text-center text-gray-600 py-10">
                  Your cart is empty 🛒
                </p>
              ) : (
                allCart.map((item) => (
                  <div
                    key={item.cart_id}
                    className="flex flex-col md:flex-row items-center justify-between border-b py-4 gap-4"
                  >
                    {/* Product */}
                    <div className="flex items-center gap-4 w-full md:w-1/3">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-20 h-20 object-cover rounded-md shadow-sm"
                      />
                      <p className="font-medium">{item.product_name}</p>
                    </div>

                    {/* Price */}
                    <div className="w-full md:w-1/6 text-center text-gray-700 font-semibold">
                      Rs {item.price_per_item}
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center justify-center gap-2 w-full md:w-1/6">
                      <button
                        onClick={() =>
                          updateCart(
                            item.cart_id,
                            item.quantity - 1,
                            item.price_per_item
                          )
                        }
                        className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCart(
                            item.cart_id,
                            item.quantity + 1,
                            item.price_per_item
                          )
                        }
                        className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    {/* Delete */}
                    <div className="w-full md:w-1/6 flex justify-center">
                      <MdDelete
                        onClick={() => deleteCart(item)}
                        className="cursor-pointer text-2xl text-red-500 hover:scale-110 transition"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Totals */}
            <div className="w-full md:w-1/3 bg-[#F9F1E7] shadow-md rounded-lg p-6">
              <h2 className="text-xl font-bold text-center mb-4">Cart Totals</h2>
              <div className="space-y-3">
                {allCart.map((item) => (
                  <div
                    key={item.cart_id}
                    className="flex justify-between text-gray-700"
                  >
                    <span>{item.product_name}</span>
                    <span>
                      {item.quantity} × {Math.floor(item.price_per_item)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t mt-4 pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>Rs {grandTotal}</span>
              </div>
              <button className="mt-5 no-underline w-full py-2 rounded-lg bg-black text-white font-semibold hover:bg-gray-800 transition">
                <Link to={'/checkout'} className="no-underline text-white" >Proceed to Checkout</Link>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default Cart;
