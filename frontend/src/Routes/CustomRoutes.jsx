import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import Home from '../Pages/Home';
import { GlobalContext } from '../Context/Context';
import Products from '../Pages/Products';
import AddProducts from '../admin/AddProducts';
import AddCategories from '../admin/AddCategories';
import Productsdetail from '../Pages/Productsdetail';
import Allblogs from '../Blog/Allblogs';
import Admindashbord from '../admin/Admindashbord';
import Cart from '../Pages/Cart';
import Loader from '../Pages/Loader';
import Checkout from '../Pages/Checkout';

const CustomRoutes = () => {
  const { state } = useContext(GlobalContext);

  const isAdmin = state.isLogin && state.user?.user_role === 1;
  const isUser = state.isLogin && state.user?.user_role === 4;

  if (state.loading || state.isLogin === null) {
    return <Loader />;
  }

  if (!state.isLogin) {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  if (isUser) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/blog" element={<Allblogs />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productsdetails/:id" element={<Productsdetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/addproduct" element={<AddProducts />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/addcategories" element={<AddCategories />} />
        <Route path="/product" element={<Products />} />
        <Route path="/blog" element={<Allblogs />} />
        <Route path="/productsdetails/:id" element={<Productsdetail />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    );
  }

  // fallback (just in case)
  return <Navigate to="/login" />;
};

export default CustomRoutes;
