import React, { useContext, useEffect, useState } from 'react';
import { IoIosLogIn, IoIosLogOut } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../Context/Context';
import { toast } from 'sonner';
import { CiMenuFries } from "react-icons/ci";
import { FaLuggageCart, FaRegHeart } from 'react-icons/fa';
import api from '../Api';

const Navbar = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  console.log()

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Shop', path: '/product' },
    { title: 'Blog', path: '/blog' },
    { title: 'Hot Deal', path: '/hotdeal' },
    ...(state?.user?.user_role === 1 ? [
      { title: 'Add Product', path: '/addproduct' },
      { title: 'Add Categories', path: '/AddCategories' },
    ] : [])
  ];

  const handleLogout = async () => {
    try {
      await api.post('/logout',{});
      dispatch({ type: 'USER_LOGOUT' });
      toast.success('Logged out successfully!');
      navigate('/login');
    } catch (error) {
      console.error("Logout Error:", error);
      toast.error("Logout failed");
    }
  };

   useEffect(() => {
  const fetchCart = async () => {
    if (!state?.isLogin || !state?.user?.user_id) return;

    try {
      const res = await api.get(`/cart/${state.user.user_id}`);
      const items = res.data?.cartItems || [];
      const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
      dispatch({ type: "SET_CART_COUNT", payload: totalQty });
    } catch (error) {
      console.error("Cart fetch error:", error);
    }
  };

  fetchCart();
}, [state?.isLogin, state?.user?.user_id]);
  

  return (
    <header className="fixed top-0 w-full z-50 bg-white/60 backdrop-blur-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          <div className="flex items-center gap-x-4">
            <button
              onClick={() => setMenuOpen(!isMenuOpen)}
              className="text-2xl text-violet-800 lg:hidden"
            >
              <CiMenuFries />
            </button>
            <Link to="/" className="text-3xl text-green-600 uppercase font-bold">
              <span className="text-black">E-</span>Shop
            </Link>
          </div>

          <div className="hidden lg:flex gap-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className="relative no-underline group text-gray-600 hover:text-green-700 text-base font-medium transition-colors"
              >
                {link.title}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-green-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex gap-x-5 items-center">
            <FaRegHeart className="text-2xl hover:text-green-700 text-gray-600" />
            <Link to="/cart" className="relative">
              <FaLuggageCart className="text-2xl hover:text-green-700 text-gray-600" />
              {state.cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {state.cartCount}
                </span>
              )}
            </Link>
            {state?.user?.email ? (
              <IoIosLogOut
                onClick={handleLogout}
                className="text-3xl text-gray-600 cursor-pointer hover:text-gray-700"
              />
            ) : (
              <Link
                to="/login"
                className="text-3xl text-gray-600 cursor-pointer hover:text-gray-700"
              >
                <IoIosLogIn />
              </Link>
            )}
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-4 py-3 space-y-2 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="block text-gray-700 hover:bg-indigo-500 hover:text-white px-3 py-2 rounded-md transition"
                >
                  {link.title}
                </Link>
              ))}
              <div className="pt-4 pb-2">
                {state?.user?.email ? (
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
