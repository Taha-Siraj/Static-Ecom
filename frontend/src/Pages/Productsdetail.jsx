import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdOutlineStarPurple500, MdStarPurple500 } from "react-icons/md";
import { FaLuggageCart } from 'react-icons/fa';
import { FaHeart, FaRegHeart, FaGroupArrowsRotate } from 'react-icons/fa6';
import { FaRegQuestionCircle, FaShareAlt } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';
import { CiDeliveryTruck } from "react-icons/ci";
import { BsArrowReturnLeft } from "react-icons/bs";
import { GlobalContext } from '../Context/Context';
import api from '../Api'; 
import Loader from './Loader';

const ProductDetail = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate(); 

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/allproducts`);
      const matched = res.data.find((p) => String(p.product_id) === id); 
      setProduct(matched);
      if (state.user && state.user.wishlist && matched) {
        setWishlist(state.user.wishlist.some(item => String(item.product_id) === id));
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id, state.user]); 
  const handleAddToCart = async () => {
    if (!state?.user?.user_id) {
      toast.error("Please login to add products to your cart.");
      navigate("/login");
      return;
    }

    if (!product) {
      toast.error("Product data is not available.");
      return;
    }

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
      toast.success('Product added to cart successfully!');
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error('Failed to add to cart.');
    }
  };



  useEffect(() => {
    if (quantity < 1) setQuantity(1);
  }, [quantity]);

  if (loading) return <Loader className="pt-24 text-center text-lg text-gray-600">Loading product details...</Loader>;
  if (!product) return <p className="pt-24 text-center text-red-600 text-lg font-medium">Product not found. Please try again later.</p>;

  return (
    <div className="mt-24 font-poppins px-4 md:px-10 py-8 flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-start bg-gray-50 min-h-[calc(100vh-6rem)]">
      <Toaster position="top-center" richColors closeButton />

      <div className="w-full lg:w-1/2 border rounded-md overflow-hidden p-6 flex flex-col items-center justify-center">
        <div className="w-full h-96 md:h-[500px] flex items-center justify-center relative">
          <img
            src={product.product_img || "https://via.placeholder.com/600x600/F3F4F6/9CA3AF?text=Product+Image"}
            alt={product.product_name}
            className="max-w-full max-h-full object-contain transform hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col gap-y-2 p-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          {product.product_name}
        </h1>
        <p className="text-sm text-gray-600">
          Category: <span className="font-semibold text-green-700">{product.category_name || 'Uncategorized'}</span>
        </p>

        <div className="flex items-center gap-2 text-yellow-500">
         
          {[...Array(4)].map((_, i) => <MdStarPurple500 key={i} className="text-2xl" />)}
          <MdOutlineStarPurple500 className="text-2xl opacity-60" />
          <span className="text-gray-700 font-semibold text-base ml-1">(120 Reviews)</span>
          <a href="#reviews" className="text-blue-600 text-sm hover:underline ml-auto">Write a review</a>
        </div>

        <hr className="border-gray-200" />

        <div className="flex items-baseline gap-2">
          <p className="text-4xl font-bold text-green-700">
            Rs. {product.price ? product.price.toLocaleString() : 'N/A'}.00
          </p>
         
        </div>

        <p className="text-base text-gray-800 leading-relaxed">
          {product.description || "A high-quality product designed to meet your needs. Enjoy superior performance and a sleek design, perfect for everyday use."}
        </p>

        <div className="flex items-center gap-4">
          <label htmlFor="quantity" className="font-semibold text-gray-700">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-24 border border-gray-300 rounded-lg py-2 px-3 text-lg text-center focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-200"
          />
          <span className="ml-4 text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-semibold">
            In Stock
          </span>
        </div>

        <hr className="border-gray-200" />

    
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={handleAddToCart}
            className="bg-green-700 w-full sm:w-auto flex items-center justify-center gap-2 text-white py-3 px-6 rounded-xl text-lg font-semibold hover:bg-green-800 transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <FaLuggageCart className="text-xl" />
            Add To Cart
          </button>
          <button className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 border-green-500 bg-red-50 text-red-600' 'border-gray-300  text-gray-600 hover:border-green-400 hover:text-green-50-500`}>
            {wishlist ? <FaHeart className="text-2xl" /> : <FaRegHeart className="text-2xl" />}
          </button>
        </div>

        <hr className="border-gray-200" />

        <details className="group pt-2 w-full cursor-pointer">
          <summary className="flex justify-between items-center text-lg font-semibold text-gray-800 py-2 border-b border-gray-200 group-hover:text-green-700 transition-colors duration-200">
            Product Specifications
            <svg
              className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </summary>
          <div className="px-4 py-3 text-gray-700">
            <div className="grid grid-cols-2 gap-y-2 gap-x-4">
              <p className="font-medium">Category:</p>
              <p className="text-right">{product.category_name || 'N/A'}</p>

              <p className="font-medium">Brand:</p>
              <p className="text-right">{product.brand_name || 'Generic'}</p> 
              <p className="font-medium">Availability:</p>
              <p className="text-right">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p> 

              <p className="font-medium">SKU:</p>
              <p className="text-right">{product.sku || 'N/A'}</p> 
            </div>
          </div>
        </details>

        <hr className="border-gray-200" />

        <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600">
          <a href="#" className="flex items-center gap-1 hover:text-green-700 transition-colors duration-200">
            <FaGroupArrowsRotate className="text-lg" /> Compare
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-green-700 transition-colors duration-200">
            <FaRegQuestionCircle className="text-lg" /> Ask a Question
          </a>
          <a href="#" className="flex items-center gap-1 hover:text-green-700 transition-colors duration-200">
            <FaShareAlt className="text-lg" /> Share
          </a>
        </div>

        <div className="border border-gray-200 mt-4 rounded-xl divide-y divide-gray-200 bg-gray-50">
          <div className="flex gap-4 items-start px-5 py-4">
            <CiDeliveryTruck className="text-green-600 text-3xl mt-1 flex-shrink-0" />
            <span>
              <h3 className="font-semibold text-lg text-gray-900">Free Delivery</h3>
              <p className="text-sm text-gray-600 mt-1">
                Estimated delivery in 3-5 business days. <a href="#" className="underline text-blue-600 hover:text-blue-800">Enter your postal code</a> for exact dates.
              </p>
            </span>
          </div>
          <div className="flex gap-4 items-start px-5 py-4">
            <BsArrowReturnLeft className="text-orange-600 text-3xl mt-1 flex-shrink-0" />
            <span>
              <h3 className="font-semibold text-lg text-gray-900">Easy Returns</h3>
              <p className="text-sm text-gray-600 mt-1">
                Free 30-day returns. Hassle-free process for your peace of mind. <a href="#" className="underline text-blue-600 hover:text-blue-800">Learn more</a>.
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;