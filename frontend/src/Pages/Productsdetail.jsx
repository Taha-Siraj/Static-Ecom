import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import { FaLock, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { GlobalContext } from '../Context/Context';
import api from '../Api';
import Loader from './Loader';

const ProductDetail = () => {
    const { state, dispatch } = useContext(GlobalContext);
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                // Inefficient: Fetches all products. Should be /products/:id
                const res = await api.get(`/allproducts`); 
                const matchedProduct = res.data.products.find((p) => String(p.product_id) === id);
                setProduct(matchedProduct);
                if (state.user?.wishlist && matchedProduct) {
                    setIsWishlisted(state.user.wishlist.some(item => String(item.product_id) === id));
                }
            } catch (error) {
                toast.error('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchProduct();
        }
    }, [id, state.user]);

    const handleAddToCart = async (buyNow = false) => {
        if (!state.user?.user_id) {
            toast.error("Please login to continue.");
            navigate("/login");
            return;
        }
        if (!product) return;

        try {
            await api.post(`/cart`, {
                user_id: state.user.user_id,
                product_id: product.product_id,
                price_per_item: product.price,
                quantity,
                product_name: product.product_name,
                product_image: product.product_img,
                product_category: product.category_name,
            });
            dispatch({ type: "SET_CART_COUNT", payload: state.cartCount + quantity });
            toast.success('Product added to cart!');
            if (buyNow) {
                navigate('/checkout');
            }
        } catch (error) {
            toast.error('Failed to add product to cart.');
        }
    };

    const getDeliveryDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 5); // 5 days from now
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    };

    if (loading) return <Loader />;
    if (!product) return <div className="pt-32 text-center text-xl">Product not found.</div>;
    
    // Star Rating Component
    const renderStars = (rating = 4.5) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-500" />);
            }
        }
        return stars;
    };
    
    return (
        <div className="bg-white pt-28">
            <Toaster position="top-center" richColors />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-[40%,35%,25%] gap-8">
                    
                    {/* Column 1: Image Gallery */}
                    <div className="lg:col-span-1 flex justify-center items-start">
                         <img
                            src={product.product_img}
                            alt={product.product_name}
                            className="w-full max-w-md h-auto object-contain rounded-lg"
                        />
                    </div>

                    {/* Column 2: Product Details */}
                    <div className="lg:col-span-1">
                        <h1 className="text-2xl md:text-3xl font-medium text-gray-900">
                            {product.product_name}
                        </h1>
                        <a href="#" className="text-sm text-cyan-700 hover:underline hover:text-orange-600">
                            Visit the {product.brand_name || 'Generic'} Store
                        </a>
                        <div className="flex items-center mt-2">
                            <span className="flex items-center">{renderStars(product.rating)}</span>
                            <a href="#reviews" className="ml-3 text-sm font-medium text-cyan-700 hover:underline">
                                {product.reviews || 120} ratings
                            </a>
                        </div>
                        <hr className="my-4" />
                        <div>
                            <span className="text-sm text-gray-500 line-through">
                                Rs. {Math.floor(product.price * 1.2).toLocaleString()}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-3xl text-red-700 font-medium">
                                    Rs. {product.price.toLocaleString()}
                                </span>
                                <span className="text-sm font-semibold text-gray-800"> (20% off)</span>
                            </div>
                            <p className="text-sm text-gray-600">Inclusive of all taxes</p>
                        </div>
                        <hr className="my-4" />
                        <div className="space-y-2">
                            <h3 className="font-semibold text-lg">About this item</h3>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                <li>{product.description || "High-quality material for long-lasting use."}</li>
                                <li>Ergonomic design for comfortable handling.</li>
                                <li>Comes with a 1-year manufacturer warranty.</li>
                                <li>Perfect for both personal and professional use.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 3: Action Box */}
                    <div className="lg:col-span-1">
                        <div className="border rounded-lg p-4">
                            <p className="text-3xl text-red-700 font-medium">
                                Rs. {product.price.toLocaleString()}
                            </p>
                            <p className="mt-2 text-sm">
                                <span className="font-semibold text-gray-800">FREE delivery</span> {getDeliveryDate()}.
                            </p>
                            <p className="mt-2 text-cyan-700 text-sm">Deliver to Taha - Karachi</p>
                            <p className="mt-4 text-xl text-green-700 font-semibold">In Stock</p>
                            <div className="mt-4">
                                <label htmlFor="quantity" className="text-sm font-medium text-gray-700 mr-2">Quantity:</label>
                                <select 
                                    id="quantity"
                                    value={quantity} 
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                >
                                    {[...Array(10).keys()].map(i => <option key={i+1} value={i+1}>{i+1}</option>)}
                                </select>
                            </div>
                            <button
                                onClick={() => handleAddToCart()}
                                className="w-full mt-4 py-3 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition-colors"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={() => handleAddToCart(true)}
                                className="w-full mt-2 py-3 bg-orange-500 text-black rounded-full font-semibold hover:bg-orange-600 transition-colors"
                            >
                                Buy Now
                            </button>
                            <div className="text-sm text-gray-600 flex items-center gap-2 mt-3">
                                <FaLock className="text-gray-400"/>
                                <span>Secure transaction</span>
                            </div>
                            <hr className="my-4" />
                            <button 
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className="w-full text-sm text-left px-3 py-2 border rounded-md hover:bg-gray-100"
                            >
                                {isWishlisted ? 'Added to Wish List' : 'Add to Wish List'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;