import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { MdOutlineStarPurple500, MdStarPurple500 } from "react-icons/md";
import { FaLuggageCart } from 'react-icons/fa';
import { FaHeart, FaRegHeart, FaGroupArrowsRotate } from 'react-icons/fa6';
import { FaRegQuestionCircle, FaShareAlt } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';
import { TbTruckDelivery } from "react-icons/tb";
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

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/allproducts`);
      const matched = res.data.find((p) => p.product_id === Number(id));
      console.log("product details ", res.data)
      setProduct(matched)
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const navigate = useNavigate("");
  const handleAddToCart = async (product) => {
    if (!state?.user?.user_id) {
      toast.error("Please login to add products to your cart.");
      navigate("/login")
      return;
    }

    try {
     let res =  await api.post(`/cart`, {
        user_id: state.user.user_id,
        product_id: product.product_id,
        price_per_item: product.price,
        quantity,
      });
      console.log("res.data" , res.data)
      dispatch({ type: "SET_CART_COUNT", payload: state.cartCount + quantity });
      toast.success('Product added to cart successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to add to cart');
    }
  };

  useEffect(() => {
    if (quantity < 1) setQuantity(1);
  }, [quantity]);

  if (loading) return <Loader className="pt-24 text-center">Loading...</Loader>;
  if (!product) return <p className="pt-24 text-red-500 text-center">Product not found</p>;

  return (
    <div className="mt-24 font-poppins px-4 md:px-10 py-4 flex flex-col gap-6 md:flex-row justify-between items-start">
      <Toaster position="top-right" richColors />

      {/* Product Image */}
      <div className="w-full md:w-[50%] h-[400px] md:h-[550px] border p-4 rounded-lg flex justify-center items-center">
        <img
          src={product.product_img || "https://via.placeholder.com/400x400?text=No+Image"}
          alt={product.product_name}
          className="w-full h-full object-contain hover:scale-110 transition duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="w-full md:w-[50%] flex flex-col gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold">{product.product_name}</h2>
        <p className="text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex unde illum expedita...
        </p>
        <p className="text-sm text-gray-700 flex items-start gap-2">
          <span className="font-semibold text-black">Description:</span>
          {product.description || "No description available."}
        </p>

        {/* Rating */}
        <p className="text-[#2e902a] flex items-center gap-1">
          {[...Array(4)].map((_, i) => <MdOutlineStarPurple500 key={i} />)}
          <MdStarPurple500 />
          <span className="text-black font-semibold text-sm">(120)</span>
        </p>

        <hr />

        {/* Price & Quantity */}
        <p className="text-lg text-green-800 font-bold">Rs. {product.price}.00</p>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-24 text-black border rounded-md py-2 px-2 outline-none"
        />
        <span className="text-green-700 bg-green-100 px-2 py-1 rounded text-sm font-semibold">In Stock</span>

        <hr />

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-[#063222cc] w-full flex items-center justify-center gap-2 text-white py-2 px-4 rounded-lg hover:bg-[#063c28] transition"
          >
            <FaLuggageCart />
            Add To Cart
          </button>
          <button
            onClick={() => setWishlist(!wishlist)}
            className="p-3 border border-green-600 rounded-md"
          >
            {wishlist ? <FaHeart className="text-green-800" /> : <FaRegHeart className="text-green-600" />}
          </button>
        </div>

        {/* Details Section */}
        <details className="pt-3 w-full">
          <summary className="cursor-pointer hover:underline text-sm font-medium">
            {product.product_name}
          </summary>
          <div className="flex justify-between mt-2">
            <div className="space-y-1">
              <p>Category:</p>
              <p>Collection:</p>
              <p>Stock:</p>
            </div>
            <div className="space-y-1 text-right">
              <p>{product.category_name}</p>
              <p>2025</p>
              <p>Available</p>
            </div>
          </div>
        </details>

        <hr />

        {/* Extra Features */}
        <div className="flex justify-between items-center flex-wrap gap-3 text-sm">
          <span className="hover:text-red-600 flex items-center gap-1 cursor-pointer">
            <FaGroupArrowsRotate /> Compare Color
          </span>
          <span className="hover:text-red-600 flex items-center gap-1 cursor-pointer">
            <FaRegQuestionCircle /> Ask a Question
          </span>
          <span className="hover:text-red-600 flex items-center gap-1 cursor-pointer">
            <TbTruckDelivery /> Delivery & Return
          </span>
          <span className="hover:text-red-600 flex items-center gap-1 cursor-pointer">
            <FaShareAlt /> Share
          </span>
        </div>

        {/* Delivery Info */}
        <div className="border mt-3 rounded-md divide-y">
          <div className="flex gap-3 items-start p-3">
            <CiDeliveryTruck className="text-orange-600 text-2xl" />
            <span>
              Free Delivery
              <p className="underline text-sm">Enter your postal code for availability.</p>
            </span>
          </div>
          <div className="flex gap-3 items-start p-3">
            <BsArrowReturnLeft className="text-orange-600 text-2xl" />
            <span>
              Return Delivery
              <p className="underline text-sm">Free 30-day returns.</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
