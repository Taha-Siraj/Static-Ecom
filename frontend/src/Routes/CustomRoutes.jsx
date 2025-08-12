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
import Cart from '../Pages/Cart';
import Loader from '../Pages/Loader';
import Checkout from '../Pages/Checkout';
import Forgetpassword from '../Authentication/Forgetpassword';

const CustomRoutes = () => {
  const { state } = useContext(GlobalContext);
  const isAdmin = state.isLogin && state.user?.user_role === 1;
  const isUser = state.isLogin && state.user?.user_role === 4;

  if (state.loading || state.isLogin === null) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product" element={<Products />} />
      <Route path="/blog" element={<Allblogs />} />
      <Route path="/forgetpassword" element={<Forgetpassword />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/productsdetails/:id" element={<Productsdetail />} />

      {!state.isLogin && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      )}

      <Route
        path="/checkout"
        element={
          state.isLogin ? <Checkout /> : <Navigate to="/login" replace />
        }
      />

      {isAdmin && (
        <>
          <Route path="/addproduct" element={<AddProducts />} />
          <Route path="/addcategories" element={<AddCategories />} />
        </>
      )}

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default CustomRoutes;
