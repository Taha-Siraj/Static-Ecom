import React, { useEffect, useState } from 'react';
import { IoLocationSharp, IoCallSharp, IoTimeOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'; 
import { BiSolidUpArrowSquare } from "react-icons/bi";

const Footer = () => { 

    const contactInfo = [
        {
            id: 1,
            icon: <IoLocationSharp className='text-3xl text-green-700' />, 
            title: 'Our Location', 
            text: 'Karachi, Pakistan',
        },
        {
            id: 2,
            icon: <IoCallSharp className='text-3xl text-green-700' />,
            title: 'Call Us',
            text: '+92 312 3456789', 
        },
        {
            id: 3,
            icon: <IoTimeOutline className='text-3xl text-green-700' />,
            title: 'Working Hours',
            text: 'Mon - Fri: 9:00 AM - 5:00 PM PST', 
        },
        {
            id: 4,
            icon: <MdOutlineEmail className='text-3xl text-green-700' />,
            title: 'Email Us',
            text: 'support@e-shop.com' 
        }
    ];

    const socialLinks = [
        { id: 1, icon: <FaFacebookF />, url: 'https://facebook.com' },
        { id: 2, icon: <FaTwitter />, url: 'https://twitter.com' },
        { id: 3, icon: <FaInstagram />, url: 'https://instagram.com' },
        { id: 4, icon: <FaLinkedinIn />, url: 'https://linkedin.com' },
    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    const [showScrollTopButton, setShowScrollTopButton] = useState(false);
   useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) { 
                setShowScrollTopButton(true);
            } else {
                setShowScrollTopButton(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    return (
        <footer className='font-poppins bg-gray-900 text-gray-300 pt-12 pb-6 relative'>
            <div className='container mx-auto px-4 md:px-8 py-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
                {contactInfo.map((info) => (
                    <div key={info.id} className='flex items-start gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:shadow-lg'>
                        {info.icon}
                        <div>
                            <h3 className='text-xl font-semibold text-white'>{info.title}</h3>
                            <p className='text-gray-400 text-sm'>{info.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            <hr className='border-gray-700 my-8' />

            <div className="container mx-auto px-4 md:px-8 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-extrabold text-green-500">
                            <span className="text-white">E</span>-SHOP
                        </h1>
                        <p className="text-gray-400 leading-relaxed">
                            Discover curated outfits and cutting-edge electronics at E-SHOP, blending style and innovation to elevate your everyday.
                        </p>
                        <div className="flex gap-4 mt-2">
                            {socialLinks.map(link => (
                                <a 
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-green-500 transition-colors duration-300 text-2xl"
                                    aria-label={link.url.includes('facebook') ? 'Facebook' : link.url.includes('twitter') ? 'Twitter' : link.url.includes('instagram') ? 'Instagram' : 'LinkedIn'}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-semibold text-white mb-2">Quick Links</h2>
                        <Link className="text-gray-400 hover:text-green-500 transition-colors" onClick={() => {window.scrollTo({top: 0, behavior: "smooth"})}} to="/">Home</Link>
                        <Link className="text-gray-400 hover:text-green-500 transition-colors" onClick={() => {window.scrollTo({top: 0, behavior: "smooth"})}}  to="/product">Shop</Link>
                        <Link className="text-gray-400 hover:text-green-500 transition-colors" onClick={() => {window.scrollTo({top: 0, behavior: "smooth"})}}  to="/blog">blogs</Link>
                        <Link className="text-gray-400 hover:text-green-500 transition-colors" onClick={() => {window.scrollTo({top: 0, behavior: "smooth"})}} to="/contact">Contact</Link>
                        <Link className="text-gray-400 hover:text-green-500 transition-colors" onClick={() => {window.scrollTo({top: 0, behavior: "smooth"})}} to="/faq">FAQ</Link>
                    </div>

                    {/* Categories */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-semibold text-white mb-2">Top Categories</h2>
                        <Link className="text-gray-400 hover:text-green-500 transition-colors" onClick={() => {window.scrollTo({top: 0, behavior: "smooth"})}} to="/product">Computer Accessories</Link>
                        <Link className="text-gray-400 hover:text-green-500 transition-colors" onClick={() => {window.scrollTo({top: 0, behavior: "smooth"})}} to="/product">Shoes Collection</Link>
                        <Link className="text-gray-400 hover:text-green-500 transition-colors"  onClick={() => {window.scrollTo({top: 0, behavior: "smooth"})}}to="/product">Men's Fashion</Link>
                        <Link className="text-gray-400 hover:text-green-500 transition-colors" onClick={() => {window.scrollTo({top: 0, behavior: "smooth"})}} to="/product">Watches</Link>
                        <Link className="text-gray-400 hover:text-green-500 transition-colors"  onClick={() => {window.scrollTo({top: 0, behavior: "smooth"})}} to="/product">Women's Fashion</Link>
                        <Link className="text-gray-400 hover:text-green-500 transition-colors" onClick={() => {window.scrollTo({top: 0, behavior: "smooth"})}}  to="/product">Electronics</Link>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-semibold text-white mb-2">Newsletter</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Subscribe to our newsletter for exclusive deals, new arrivals, and special promotions directly to your inbox.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="py-3 px-4 w-full rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                                aria-label="Enter your email for newsletter subscription"
                            />
                            <button
                                type="submit"
                                className="bg-green-600 w-full text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <hr className='border-gray-700 my-6' />

        
            <div className='container mx-auto px-4 md:px-8 text-center text-gray-500 text-sm'>
                <p>&copy; {new Date().getFullYear()} E-SHOP. All rights reserved.</p>
                <p className="mt-2 text-xs text-center text-gray-500">
                Created by <span className="font-semibold text-green-300">Taha Siraj</span> with ❤️</p>
            </div>
            {showScrollTopButton && (
                <button
                    onClick={scrollToTop}
                    className='fixed bottom-8 animate-bounce right-8 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500'>
                    <BiSolidUpArrowSquare className='text-3xl' />
                </button>
            )}
        </footer>
    );
};

export default Footer;