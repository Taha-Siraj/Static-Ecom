import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import Loader from './Loader';
import { MdOutlineStarPurple500 } from "react-icons/md";
import { MdStarPurple500 } from "react-icons/md";
import { FaLuggageCart } from "react-icons/fa";
import { use } from 'react';
import { useCol } from 'react-bootstrap/esm/Col';
import { GlobalContext } from '../Context/Context';
import api from '../Api';
const Products = () => {
  const navigate = useNavigate();
  const {state } = useContext(GlobalContext)
  const [allProduct, setAllProduct] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [category, setAllcategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [loading, setloading] = useState(true);
  const baseUrl = state.baseUrl;
  const getProduct = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        api.get(`/allproducts`),
        api.get(`/allcategories`)
      ]);
      setAllProduct(productsRes.data.products);
      setFilteredProduct(productsRes.data.products);
      setAllcategory(categoriesRes.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch data');
    }
  };

  useEffect(() => {
    getProduct().finally(() => setloading(false));
  }, []);

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    const checked = e.target.checked;
    console.log(checked)
    setSelectedCategory(selected);
    if (!selected) {
      setFilteredProduct(allProduct);
    } else {
      const filtered = allProduct.filter(prod => String(prod.category_name) === String(selected));
      setFilteredProduct(filtered);
    }
  };
  const handleResetFilter = () => {
    setSelectedCategory('');
    setFilteredProduct(allProduct);
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      {loading ? (
        <Loader />
      ) : (
        <div className='font-poppins bg-[#FFFFFF] pt-24 px-10 '>
         <div className='flex justify-between items-center'>
            <h1 className='text-2xl lg:text-3xl font-semibold text-gray-800 text-start md:text-left'>
                Get the products as your needs
              </h1>
              {selectedCategory.length > 0 && (
              <button
                onClick={handleResetFilter}
                className="text-green-500 cursor-pointer underline text-sm"
              >
                Reset Filters
              </button>
            )}
         </div>
          <hr />
         <div className="flex flex-col md:flex-row gap-6 px-4 py-6">
       <div className="w-full md:w-1/4">
       <h1 className="text-xl font-semibold mb-4">Product Categories</h1>
        <div className="flex flex-col gap-2">
      {category.map((eachcategory) => (
        <label key={eachcategory.category_id} className="flex items-center gap-2">
          <input
            type="checkbox"
            value={eachcategory.category_name}
            onChange={handleCategoryChange}
            checked={selectedCategory.includes(eachcategory.category_name)}
            className="accent-green-600 w-4 h-4"
          />
          <span className="text-sm text-gray-700">{eachcategory.category_name}</span>
        </label>
      ))}
    </div>
  </div>

    <div className="w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {filteredProduct.map((eachProduct) => (
    <div
      key={eachProduct.product_id}
      className="bg-white max-w-sm w-full rounded-md flex flex-col overflow-hidden  shadow-sm h-full"
    >
      <div className="relative overflow-hidden">
        <img
          src={eachProduct?.product_img}
          onClick={() => navigate(`/productsdetails/${eachProduct.product_id}`)}
          alt={eachProduct?.product_name || "Product Image"}
          className="w-full h-56 object-cover cursor-pointer transition-transform duration-300 hover:scale-110"
        />
        {eachProduct?.category_name && (
          <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {eachProduct.category_name}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between flex-grow px-2 py-2 gap-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-[14px] py-1 font-semibold text-black" title={eachProduct?.product_name}>
            {eachProduct?.product_name}
          </h2>
          <p className="text-md text-[#93D991] flex items-center gap-1">
            <MdOutlineStarPurple500 />
            <MdOutlineStarPurple500 />
            <MdOutlineStarPurple500 />
            <MdOutlineStarPurple500 />
            <MdStarPurple500 />
            <span className="text-sm text-gray-400 ml-2">5 Reviews</span>
          </p>
          <p className="text-xl font-bold text-gray-900">
            Rs. <span className="text-green-600">{eachProduct?.price}</span>
          </p>
        </div>
      </div>
    </div>
  ))}
    </div>
    </div>
    </div>
      )}
    </>
  );
};

export default Products;