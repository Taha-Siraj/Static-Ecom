import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../Authentication/Login';
import Signup from '../Authentication/Signup';
import Home from '../Pages/Home';
import { GlobalContext } from '../Context/Context';
import Products from '../Pages/Products';
import Productsdetail from '../Pages/Productsdetail';
import Allblogs from '../Blog/Allblogs';
import Cart from '../Pages/Cart';
import Loader from '../Pages/Loader';
import Checkout from '../Pages/Checkout';
import Forgetpassword from '../Authentication/Forgetpassword';
import Card from '../Pages/Card';
import Contact from '../Pages/Contact';
import Success from '../Pages/Success';

const CustomRoutes = () => {
  const { state } = useContext(GlobalContext);

  
  if (state.loading || state.isLogin === null) {
    return <Loader />;
  }

  return (
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/card" element={<Card />} />
      <Route path="/product" element={<Products />} />
      <Route path="/blog" element={<Allblogs />} />
      <Route path="/forgetpassword" element={<Forgetpassword />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/contact" element={<Contact />} />
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
      <Route path="/success" element={state.isLogin ? <Success /> : <Navigate to="/login" replace />} />


      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default CustomRoutes;
