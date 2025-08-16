import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/Context';
import { useNavigate, Link } from 'react-router-dom';
import { MdStarPurple500, MdOutlineStarPurple500 } from 'react-icons/md';
import { FaLuggageCart } from 'react-icons/fa';
import { toast, Toaster } from 'react-hot-toast';
import Allblogs from '../Blog/Allblogs';
import Loader from './Loader';
import api from '../Api';
import { FiShare2, FiRepeat, FiHeart } from "react-icons/fi"

const Home = () => {

    const { state, dispatch } = useContext(GlobalContext);
    const [allProducts, setAllProducts] = useState([]);
    const [homeDisplayProducts, setHomeDisplayProducts] = useState([]);
    const [popularCategories, setPopularCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchProductsAndCategories = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/allproducts`);
            const fetchedProducts = res.data.products;
            setAllProducts(fetchedProducts);
            setHomeDisplayProducts(fetchedProducts.slice(0, 12));
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

    const handleAddToCart = async (product) => {
        if (!state?.user?.user_id) {
            toast.error("Please login to add products to your cart.");
            navigate("/login");
            return;
        }
        try {
            await api.post(`/cart`, {
                user_id: state.user.user_id,
                product_id: product.product_id,
                price_per_item: product.price,
                quantity: 1,
                product_name: product.product_name,
                product_image: product.product_img,
                product_category: product.category_name,
            });
            dispatch({ type: "SET_CART_COUNT", payload: state.cartCount + 1 });
            toast.success(`${product.product_name} added to cart!`);
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error('Failed to add to cart.');
        }
    };

    return (
        <div className="font-poppins bg-white pt-20 overflow-hidden">
            <Toaster position="bottom-right" richColors closeButton />
            <section className="px-4 md:px-8 lg:px-16 mb-12">
                <div className="bg-gradient-to-r from-teal-500 to-green-600 w-full rounded-2xl p-6 sm:p-10 md:p-16 flex flex-col md:flex-row justify-between items-center text-white relative overflow-hidden shadow-2xl">
                    <div className="flex flex-col justify-center items-center md:items-start gap-4 max-w-lg text-center md:text-left z-10">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight drop-shadow-lg animate-fade-in-up">
                            Unbeatable Deals! <br />
                            <span className="text-yellow-300">Save Up To 50%</span> on Premium Smart watches & Headphones
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-100 mb-4 animate-fade-in-up delay-200">
                            Experience crystal-clear audio and deep bass. Limited time offer!
                        </p>
                        <Link
                            to="/product"
                            className="bg-white outline-none text-green-800 py-3 px-8 rounded-full font-bold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl animate-fade-in-up delay-400">
                            Shop Headphones Now!
                        </Link>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <img src="banner.webp" alt="Abstract Background" className="w-full h-full object-cover" />
                    </div>

                </div>
            </section>
            <div className='flex justify-between px-5'>
                <img src="airbuds.jpg" className='rounded-md w-[400px] ' alt="" />
                <img src="airbuds.jpg" className='rounded-md w-[400px] ' alt="" />
                <img src="airbuds.jpg" className='rounded-md w-[400px] ' alt="" />
            </div>

            <main className="container mx-auto px-4 md:px-8 xl:px-16 lg:px-12 py-12">
                <section className="mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Our Featured Products</h2>
                    <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
                        Explore our handpicked selection of top-quality products, designed to enhance your lifestyle. From trendy outfits to essential tech, find your next favorite item here.
                    </p>
                    <div>
                        {loading ? (
                            <Loader className="text-center py-10">Loading amazing products...</Loader>
                        ) : (
                            <div className="flex justify-center md:flex-row  gap-x-4 gap-y-4">
                                {homeDisplayProducts.map((product) => (
                                    <>

                                        <div key={product.product_id} className="relative duration-500 transition-all delay-150 group bg-white rounded-md w-[300px]  border border-gray-100"> 
                                            <div className='h-full w-full bg-[#000000] absolute  opacity-75 hidden group-hover:block cursor-pointer ' >
                                                  <div className="flex h-full justify-center flex-col items-center gap-1">
                                                   <button className=' hover:scale-90 duration-300 py-3 px-4 bg-[#bdbdbdde]'> <Link  className='text-black uppercase no-underline font-semibold' to={`/productsdetails/${product.product_id}`}> View product </Link></button>
                                                    <button className="flex items-center gap-1 px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-200 transition">
                                                        <FiShare2 className="w-4 h-4" />
                                                        Share
                                                    </button>
                                                    <button className="flex items-center gap-1 px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-200 transition">
                                                        <FiRepeat className="w-4 h-4" />
                                                        Compare
                                                    </button>
                                                    <button className="flex items-center gap-1 px-3 py-1 bg-black text-white rounded-md text-sm hover:bg-gray-200 transition">
                                                        <FiHeart className="w-4 h-4" />
                                                        Like
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="w-full overflow-hidden">
                                                <img
                                                    src={product.product_img || "https://via.placeholder.com/400x300/F3F4F6/9CA3AF?text=No+Image"}
                                                    alt={product.product_name}
                                                    className="w-full h-full object-cover"
                                                    onClick={() => navigate(`/product/${product.product_id}`)}
                                                />
                                                

                                            </div>
                                            <div className="p-3 flex flex-col gap-2">
                                                <h1 className='text-[20px] font-bold capitalize '>{product.product_name}</h1>
                                                <p className="text-gray-600 m-0 text-sm">{product.description || "High quality product for daily use."}</p>
                                                <p className="text-xl font-bold mt-2">Rs. {product.price?.toLocaleString()}.00</p>
                                                <div className=" flex items-center capitalize justify-start w-full">
                                    
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="text-center mt-12">
                        <Link
                            to="/product"
                            className="bg-green-700 text-white py-3 px-8 rounded-full font-bold text-lg hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-xl"
                        >
                            View All Products
                        </Link>
                    </div>
                </section>

                <section className="mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Shop By Popular Categories</h2>
                    <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
                        Discover top picks in various categories. Find exactly what you need, from fashion essentials to cutting-edge gadgets.
                    </p>
                    {loading ? (
                        <Loader className="text-center py-10">Loading categories...</Loader>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {popularCategories.map((product) => (
                                <Link
                                    to={`/category/${product.category_name?.toLowerCase().replace(/\s+/g, '-')}`}
                                    key={product.category_id || product.product_id}
                                    className="h-32 sm:h-36 flex items-center gap-6 p-4 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                                >
                                    <img
                                        src={product.product_img || "https://via.placeholder.com/100x100?text=Category"}
                                        alt={product.category_name || "Category Image"}
                                        className="w-24 h-24 object-cover rounded-md border border-gray-300 flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="flex flex-col">
                                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-700 transition-colors capitalize">
                                            {product.category_name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mt-1">

                                            {product.items_available ? `${product.items_available} items available` : 'Explore collection'}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </section>

                <section className="mt-16">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Our Latest Blogs</h2>
                    <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-10">
                        Stay updated with our latest articles, guides, and trends. From fashion tips to tech reviews, there's always something new to learn.
                    </p>
                    <Allblogs />
                </section>
            </main>
        </div>
    );
};

export default Home;