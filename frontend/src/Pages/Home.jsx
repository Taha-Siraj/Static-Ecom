import  { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../Context/Context';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineStarPurple500 } from 'react-icons/md';
import { FaLuggageCart } from 'react-icons/fa';
import Allblogs from '../Blog/Allblogs';
import Loader from './Loader';
import api from '../Api';
const Home = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [ allProducts, setAllProducts ] = useState([]);
  const [HomeProducts ,  setHomeProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const baseUrl = state.baseUrl;

    const fetchProducts = async() => {
      try {
        setLoading(true);
        let res = await api.get(`/allproducts`);
        setHomeProducts(res.data.slice(0, 10));
        setAllProducts(res.data.slice(0,6));
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    }
    
    useEffect(() => {
      fetchProducts();
    }, [])

   

  return (
    <div className="font-poppins bg-white pt-20">
    <div className='px-10'>
    <div className='bg-[#FCF0E4] w-full px-6 sm:px-10 md:px-14 rounded-lg flex flex-col md:flex-row justify-between items-center gap-6'>
    <div className='flex flex-col justify-center items-center md:items-start  gap-3 max-w-md py-2'>
    <h1 className='text-xl sm:text-2xl md:text-3xl sm:text-center md:text-start font-semibold text-green-800 leading-tight'>
    Grab Upto 50% Off on Selected Headphones
    </h1>
    <button className='bg-green-900 py-2 px-4 rounded-md font-semibold hover:bg-green-950 text-white'>
    Buy Now
    </button>
  </div>
  <img
    src="banner.webp"
    alt="Headphone Banner"
    className='w-full max-w-xs sm:max-w-sm md:max-w-md'/>
  </div>
  </div>
  <main>
    <h1 className=' text-3xl  font-bold font-poppins px-10 capitalize  mt-3 '>Our Product :</h1>
    {loading ? <Loader/> : <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-3 p-4'>
   {HomeProducts.map((eachProduct) => (
    <div key={eachProduct.product_name} className='bg-white max-w-sm rounded-md flex flex-col overflow-hidden border-[0.5px] border-[#e2e5f795]'>
      <div className='relative overflow-hidden'>
        <img src={eachProduct.product_img}
         onClick={() => navigate(`/productsdetails/${eachProduct.product_id}`)}
        alt={eachProduct.product_name} className='w-full hover:scale-110 cursor-pointer  h-56 object-cover transform  transition-transform duration-300' />
        {eachProduct?.category_name && ( 
       <div className='absolute top-3 left-3  bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md'> 
           {eachProduct.category_name}
          </div>
           )}
        <div className='px-3 text-start  justify-center items-start capitalize py-4 gap-y-3 flex flex-col'>
          <h2 className='text-lg font-semibold text-gray-800'>{eachProduct.product_name}</h2>
          <p className='text-gray-600'>Price RS: {eachProduct.price}</p>
          <div className='flex items-center gap-1'>
            {[...Array(5)].map((_, index) => (
              index < eachProduct.rating ? 
              <MdOutlineStarPurple500 key={index} className='text-yellow-500' /> : 
              <MdOutlineStarPurple500 key={index} className='text-green-600' />
            ))}
          </div>
        </div>
        
      </div>
      
    </div>
    ))}
  </div>} 
  </main>



  <div className='px-10'>
    <div className='py-4  items-start px-10 border border-gray-300 rounded-md w-full'>
    <h1 className='text-2xl'>Popular Categories</h1>
     <hr className='h-1'/>
     <div className='flex justify-center gap-5 items-center flex-wrap '>
      {allProducts.map((eachProduct) => (
        <div key={eachProduct?.category_id} className='h-[120px] flex justify-start gap-x-7 px-4 items-center w-[350px] bg-[#F6F6F6]' >
        <img src={eachProduct?.product_img} width={80} alt="" className='p-2 hover:scale-105 cursor-pointer border rounded-md border-yellow-700'  />
        <h1 className='text-[17px] flex flex-col gap-y-2 justify-center items-start font-semibold'>{eachProduct?.category_name}<span className='text-sm font-normal'>4 items Available</span> </h1>
      </div>
      ))}
      
    </div>
    </div>
    
    <div>
    </div>
  </div>

  <div>
    <Allblogs/>
  </div>
  </div>
  );
};

export default Home;