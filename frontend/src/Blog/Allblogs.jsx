import React from 'react'
import { MdDateRange } from "react-icons/md";


const Allblogs = () => {


    const blogs = [{
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
      <h1 className='text-2xl  px-10'>Our Blogs</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-10">
    {blogs.map((blog) => (
        <div key={blog.id} className="flex flex-col justify-start items-start bg-white shadow-md rounded-lg overflow-hidden">
        <img
            src={blog.img}
            alt={blog.title}
            className="w-full h-48 object-cover"
        />
        <div className="py-4 px-3 w-full flex justify-center flex-col ">
            <div className="flex justify-between items-center gap-2 mb-2">
            <h2 className="text-sm hover:underline text-green-950 cursor-pointer font-semibold">{blog.title}</h2>
            <p className="flex items-center gap-1 hover:underline cursor-pointer text-sm text-green-950">
                <MdDateRange /> {blog.date}
            </p>
            </div>
            <p className="text-gray-900 hover:cursor-pointer text-[17px] font-semibold">{blog.desc}</p>
        </div>
        </div>
    ))}
    </div>
    </div>
  )
}

export default Allblogs
