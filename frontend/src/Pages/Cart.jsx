import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../Api";
import { GlobalContext } from "../Context/Context";
import { toast } from "react-hot-toast";

const Cart = () => {
  const { state } = useContext(GlobalContext);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // 🛒 Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await api.get(`/cart/${state.user.user_id}`);
      const items = res.data?.cartItems || [];
      setCartItems(items);

      // Calculate subtotal
      const total = items.reduce(
        (sum, item) => sum + item.price_per_item * item.quantity,
        0
      );
      setSubtotal(total);
    } catch (error) {
      toast.error("Failed to load cart");
      console.error("Cart fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ❌ Delete Item
  const deleteCartItem = async (cart_id) => {
    try {
      await api.delete(`/deletedcart/${cart_id}`);
      toast.success("Item removed", { id: "delete-item" });
      fetchCart();
    } catch (error) {
      toast.error("Failed to delete item", { id: "delete-item" });
      console.error("Delete error:", error);
    }
  };

  // ➕➖ Update Quantity
  const updateQuantity = async (cart_id, type) => {
    try {
      await api.put(`/updatecart/${cart_id}`, { type }); // type = "inc" | "dec"
      fetchCart();
    } catch (error) {
      toast.error("Quantity update failed");
      console.error("Quantity update error:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 mb-4">Your cart is currently empty.</p>
          <Link
            to="/product"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Cart Table */}
          <div className="lg:col-span-2 bg-white shadow rounded-lg p-4 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600">
                  <th className="py-3">Product</th>
                  <th className="py-3">Price</th>
                  <th className="py-3">Quantity</th>
                  <th className="py-3">Total</th>
                  <th className="py-3"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.cart_id} className="border-b">
                    <td className="py-4 flex items-center gap-4">
                      <img
                        src={item.product_image}
                        alt={item.product_name}
                        className="w-20 h-20 object-cover rounded border"
                      />
                      <span className="font-semibold">
                        {item.product_name}
                      </span>
                    </td>
                    <td className="py-4">Rs. {item.price_per_item}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.cart_id, "dec")}
                          className="px-3 py-1 border rounded hover:bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-3">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cart_id, "inc")}
                          className="px-3 py-1 border rounded hover:bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 font-semibold">
                      Rs. {item.price_per_item * item.quantity}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => deleteCartItem(item.cart_id)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right: Cart Totals */}
          <div className="bg-white shadow rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
            {cartItems.map((item) => (
              <div
                key={item.cart_id}
                className="flex justify-between mb-2 text-gray-700"
              >
                <span>
                  {item.product_name} (Rs. {item.price_per_item} ×{" "}
                  {item.quantity})
                </span>
                <span className="font-semibold">
                  Rs. {item.price_per_item * item.quantity}
                </span>
              </div>
            ))}
            <hr className="my-3" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>Rs. {subtotal}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-6 block w-full text-center bg-green-500 text-white py-3 rounded-lg font-bold"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
