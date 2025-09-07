import React, { useContext, useEffect, useState } from 'react'
import { FaGreaterThan } from "react-icons/fa";
import api from '../Api'
import { useParams } from 'react-router-dom';
import { GlobalContext } from '../Context/Context';
import { MdOutlineStarPurple500 } from "react-icons/md";
import { LoaderIcon, toast, Toaster } from 'react-hot-toast';

const Productsdetail = () => {
  const { state, dispatch } = useContext(GlobalContext)
  let { id } = useParams()
  const [Productsdetail, setproductdetails] = useState([])
  const [counter, setcounter] = useState(1);
  const [loader, setLoader] = useState(false);

  const fetchproductdetails = async () => {
    try {
      setLoader(true);
      let res = await api.get('/allproducts');
      let matchproduct = res.data.products.find((item) => String(item.product_id) === String(id))
      setproductdetails(matchproduct)
    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false);
    }
  }


  if (state.isLogin === false) {
    // toast.error("Please login to add items to cart");
    return;
  }



    const addtocart = async () => {
      if (counter === 0) {
        toast.error("Please select a quantity");
        return;
      }

      try {
        let res = await api.post('/cart', {
          user_id: state.user.user_id,
          product_id: Productsdetail.product_id,
          quantity: counter,
          product_name: Productsdetail.product_name,
          product_image: Productsdetail.product_img,
          product_category: Productsdetail.category_name,
          price_per_item: Productsdetail.price,
        })
        toast.success("Product added to cart successfully");
        dispatch({ type: "SET_CART_COUNT", payload: state.cartCount + 1 });
        console.log(state.cartCount)
      } catch (error) {
        toast.error(error.response?.data?.message)
        console.log(error)
      }
    }
  



  useEffect(() => {
    fetchproductdetails()
  }, []);


  console.log(Productsdetail)
  return (
    <div className='pt-24 font-poppins w-full'>
      <Toaster position='bottom-right' />
      {/* Breadcrumb */}
      <div className='bg-[#F9F1E7] h-28 w-full flex px-4 md:px-10 justify-start gap-x-5 items-center'>
        <p className='text-gray-400 text-sm md:text-xl flex items-center gap-x-2' >
          Home <FaGreaterThan className='text-black' />
        </p>
        <p className='text-gray-400 text-sm md:text-xl flex items-center gap-x-2' >
          Shop <FaGreaterThan className='text-black' />
        </p>
        <p className='text-sm md:text-xl font-semibold text-black capitalize'>Product Detailed Page</p>
      </div>

      {/* Main Section */}
      {loader ?
        <div className='flex h-screen justify-center items-center'>
          <LoaderIcon className='animate-spin' />
        </div>
        : <div className='px-4 md:px-20 w-full py-10 flex flex-col lg:flex-row items-start gap-10'>

          {/* Left Images */}
          <div className='w-full lg:w-1/2 flex flex-col md:flex-row gap-5'>
            {/* Small thumbnails */}
            <div className='flex md:flex-col gap-3 justify-center md:justify-start'>
              {[...Array(4)].map((img, index) => (
                <img
                  key={index}
                  src={Productsdetail?.product_img}
                  className='hover:border-black border-2 cursor-pointer w-[80px] h-[80px] md:w-[100px] md:h-[100px] object-cover bg-[#F9F1E7] rounded-md'
                  alt=""
                />
              ))}
            </div>
            {/* Main image */}
            <img
              src={Productsdetail?.product_img}
              className='bg-[#F9F1E7] w-full md:w-[400px] lg:w-[450px] h-[350px] md:h-[450px] object-contain border rounded-md'
              alt=""
            />
          </div>

          {/* Right Content */}
          <div className='w-full lg:w-1/2 flex flex-col gap-y-4'>
            <h1 className='text-xl md:text-2xl font-bold'>{Productsdetail?.product_name}</h1>
            <h1 className='text-lg md:text-2xl font-bold '>RS: {Productsdetail?.price}</h1>

            {/* Ratings */}
            <div className='flex items-center gap-x-3'>
              <div className='flex'>
                {[...Array(5)].map((_, i) => (
                  <MdOutlineStarPurple500 key={i} className='text-lg md:text-xl text-[#FACC15]' />
                ))}
              </div>
              <p className='text-sm md:text-base m-0'>5 Customer Reviews</p>
            </div>

            {/* Description */}

            <p className='text-sm md:text-base'>{Productsdetail?.description}</p>

            {/* Counter & Button */}
            <div className='flex flex-col sm:flex-row gap-3 border-b pb-6 w-full'>
              <div className='border rounded-md flex justify-center items-center gap-x-2'>
                <span
                  className='text-xl md:text-2xl hover:bg-gray-200 duration-300 py-2 px-3 cursor-pointer'
                  onClick={() => { counter > 1 && setcounter(counter - 1) }}
                >-</span>
                {counter}
                <span
                  className='text-xl md:text-2xl hover:bg-gray-200 duration-300 py-2 px-3 cursor-pointer'
                  onClick={() => setcounter(counter + 1)}
                >+</span>
              </div>
              <button onClick={addtocart} className='bg-black  text-white font-semibold px-4 py-2 rounded-md w-full sm:w-auto'>
                Add to cart
              </button>
            </div>
            <div>
              <p>Category:  {Productsdetail?.category_name}</p>
            </div>

          </div>
        </div>}
    </div>
  )
}

export default Productsdetail
