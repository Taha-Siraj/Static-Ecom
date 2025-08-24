import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/Context';
import { useNavigate, Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import Allblogs from '../Blog/Allblogs';
import Loader from './Loader';
import api from '../Api';
import { FiShare2, FiHeart } from "react-icons/fi";

const Home = () => {

  const { state, dispatch } = useContext(GlobalContext);
  const [allProducts, setAllProducts] = useState([]);
  const [homeDisplayProducts, setHomeDisplayProducts] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const images = ["hero4.jpg", "hero3.jpg", "hero2.jpg"];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const fetchProductsAndCategories = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/allproducts`);
      const fetchedProducts = res.data.products;
      setAllProducts(fetchedProducts);
      setHomeDisplayProducts(fetchedProducts.slice(0, 10));
      const uniqueCategories = [];
      const categoryMap = new Map();
      fetchedProducts.forEach(p => {
        if (!categoryMap.has(p.category_name) && uniqueCategories.length < 6) {
          categoryMap.set(p.category_name, p);
          uniqueCategories.push(p);
        }
      });
      setPopularCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  return (
    <div className="font-poppins bg-white pt-20 ">
      <Toaster position="bottom-right" richColors closeButton />

      {/* Hero Section */}
      <section className="flex flex-col my-10 md:flex-row justify-between items-center bg-[#FCF0E4] px-5 md:px-10 py-8 md:h-[300px]">
        <div className="text-start md:text-center flex items-start gap-y-2 flex-col">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-800 break-words">
            Grab Upto 50% Off on <br className="hidden sm:block" />
            Selected headphones
          </h1>
          <Link to={'/product'} className="no-underline px-4 py-2 rounded-md font-semibold hover:scale-95 duration-200 transition-all bg-green-800 text-white">
            Shop Now
          </Link>
        </div>

        <div className="mt-6 md:mt-0">
          <img
            src="banner.webp"
            className="w-[250px] sm:w-[350px] md:w-[450px] object-contain mx-auto"
            alt="banner"
          />
        </div>
      </section>


      {/* Featured Products */}
      <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
        Our Featured Products
      </h2>
      <p className="text-base md:text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8 px-4">
        Explore our handpicked selection of top-quality products, designed to
        enhance your lifestyle. From trendy fashion to essential tech, find your
        next favorite item here.
      </p>

      {/* Banners */}
      <div className="flex justify-center gap-6 items-center px-4 flex-wrap md:flex-row">
        <img
          src="smartwatches.jpg"
          className="rounded-md max-w-[370px] w-full h-auto hover:brightness-75 hover:scale-105 duration-300 cursor-pointer object-cover"
          alt=""
        />
        <img
          src="headphone.avif"
          className="rounded-md max-w-[370px] w-full h-auto hover:brightness-75 hover:scale-105 duration-300 cursor-pointer object-cover"
          alt=""
        />
        <img
          src="airbuds.jpg"
          className="rounded-md max-w-[370px] w-full h-auto hover:brightness-75 hover:scale-105 duration-300 cursor-pointer object-cover"
          alt=""
        />
      </div>


      <main className="container mx-auto px-4 md:px-8 xl:px-1 lg:px-12 py-12">
        {/* Products */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl  font-extrabold text-gray-900 mb-6 text-center">
            Our Products
          </h2>

          {loading ? (
            <Loader className="text-center py-10">
              Loading amazing products...
            </Loader>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {homeDisplayProducts.map((product) => (
                <div
                  key={product.product_id}
                  className="relative group bg-white rounded-md border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 hover:scale-105"
                >
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 hidden group-hover:flex flex-col items-center justify-center gap-2">
                    <button className="py-2 px-4 bg-white text-black rounded-md font-semibold hover:scale-95 duration-200">
                      <Link className='no-underline text-black capitalize' to={`/productsdetails/${product.product_id}`}>
                        View product
                      </Link>
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-200 hover:text-black transition">
                      <FiShare2 className="w-4 h-4" />
                      Share
                    </button>

                    <button className="flex items-center gap-1 px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-200 hover:text-black transition">
                      <FiHeart className="w-4 h-4" />
                      Like
                    </button>
                  </div>

                  {/* Product Image */}
                  <img
                    src={
                      product.product_img ||
                      "https://via.placeholder.com/400x300/F3F4F6/9CA3AF?text=No+Image"
                    }
                    alt={product.product_name}
                    className="w-full h-48 md:h-56 lg:h-64 object-cover cursor-pointer"
                    onClick={() => navigate(`/product/${product.product_id}`)}
                  />

                  {/* Product Info */}
                  <div className="p-4 flex flex-col gap-2">
                    <h1 className="text-lg font-bold capitalize line-clamp-1">
                      {product.product_name}
                    </h1>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {product.description || "High quality product for daily use."}
                    </p>
                    <p className="text-lg font-bold mt-2">
                      Rs. {product.price?.toLocaleString()}.00
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/product"
              className="bg-green-700 no-underline text-white py-3 px-8 rounded-full font-bold text-lg hover:bg-green-800 transition transform hover:scale-105 shadow-xl"
            >
              View All Products
            </Link>
          </div>
        </section>

        {/* Popular Categories */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
            Shop By Popular Categories
          </h2>
          <p className="text-base md:text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Discover top picks in various categories. Find exactly what you need, from
            fashion essentials to cutting-edge gadgets.
          </p>

          {loading ? (
            <Loader className="text-center py-10">Loading categories...</Loader>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCategories.map((product) => (
                <Link
                  to={`/category/${product.category_name
                    ?.toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  key={product.category_id || product.product_id}
                  className="h-32 no-underline sm:h-36 flex items-center gap-6 p-4 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <img
                    src={
                      product.product_img ||
                      "https://via.placeholder.com/100x100?text=Category"
                    }
                    alt={product.category_name || "Category Image"}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border border-gray-300 flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-green-700 transition-colors capitalize">
                      {product.category_name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.items_available
                        ? `${product.items_available} items available`
                        : "Explore collection"}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Blogs */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-6 text-center">
            Our Latest Blogs
          </h2>
          <p className="text-base md:text-lg text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Stay updated with our latest articles, guides, and trends. From fashion tips to tech reviews, there's always something new to learn.
          </p>
          <Allblogs />
        </section>
      </main>
    </div>
  );
};

export default Home;
