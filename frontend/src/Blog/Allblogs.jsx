import React from 'react'
import { FaGreaterThan } from 'react-icons/fa';
import { MdDateRange } from "react-icons/md";

const Allblogs = () => {

  const blogs = [
    {
      id: 1,
      img: 'lifestyle.webp',
      title: 'Lifestyle',
      desc: 'Office rental agency or direct? Which is best when renting an office?',
      date: 'February 19, 2025',
    },
    {
      id: 2,
      img: 'socialmedia.webp',
      title: 'Social Media',
      desc: 'Lotus Electronics – New Store Launch in Bhilai, Chhattisgarh',
      date: 'February 19, 2025',
    },
    {
      id: 3,
      img: 'company.webp',
      title: 'Company News',
      desc: 'We Invite You to These Wonderful Wine Tasting Events',
      date: 'February 19, 2025',
    },
    {
      id: 4,
      img: 'elctronics.webp',
      title: 'Electronics',
      desc: '10 French Wine Regions to Visit for Amazing Views and Delicious Vinos',
      date: 'February 19, 2025',
    },
  ]

  return (
    <div className='mt-24 font-poppins'>
      {/* Hero Banner */}
      <div className="w-full">
        <div className="relative">
          <img
            src="hero2.jpg"
            className="object-cover w-full h-[220px] sm:h-[260px] md:h-[300px] lg:h-[350px] rounded-lg"
            alt=""
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm flex flex-col justify-center items-center text-center px-4 rounded-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              Blogs
            </h1>
            <p className="text-gray-200 text-xs sm:text-sm md:text-lg flex items-center gap-x-2">
              Home <FaGreaterThan /> <span>Blogs</span>
            </p>
          </div>
        </div>
      </div>

      {/* Blogs Section */}
      <h1 className='text-xl sm:text-2xl md:text-3xl font-bold px-6 sm:px-10 mt-10'>Our Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10 py-10">
        {blogs.map((blog) => (
          <div 
            key={blog.id} 
            className="flex flex-col justify-start items-start bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <img
              src={blog.img}
              alt={blog.title}
              className="w-full h-40 sm:h-44 md:h-48 lg:h-52 object-cover"
            />
            
            {/* Content */}
            <div className="py-4 px-4 w-full flex flex-col gap-2">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                <h2 className="text-sm sm:text-base hover:underline text-green-950 cursor-pointer font-semibold">
                  {blog.title}
                </h2>
                <p className="flex items-center gap-1 text-xs sm:text-sm hover:underline cursor-pointer text-green-950">
                  <MdDateRange className="text-base" /> {blog.date}
                </p>
              </div>
              <p className="text-gray-900 hover:cursor-pointer text-base sm:text-lg font-semibold leading-snug">
                {blog.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Allblogs
