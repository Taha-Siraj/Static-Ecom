import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoLocationSharp, IoCallSharp, IoTimeOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { BiSolidUpArrowSquare } from "react-icons/bi";


const contactInfo = [
    { id: 1, icon: <IoLocationSharp className='text-2xl text-black' />, title: 'Our Location', text: 'Karachi, Pakistan' },
    { id: 2, icon: <IoCallSharp className='text-2xl text-black' />, title: 'Call Us', text: '+92 312 3456789' },
    { id: 3, icon: <IoTimeOutline className='text-2xl text-black' />, title: 'Working Hours', text: 'Mon-Fri: 9AM - 5PM' },
    { id: 4, icon: <MdOutlineEmail className='text-2xl text-black' />, title: 'Email Us', text: 'support@e-shop.com' }
];

const socialLinks = [
    { id: 1, icon: <FaFacebookF />, url: 'https://facebook.com', label: 'Facebook' },
    { id: 2, icon: <FaTwitter />, url: 'https://twitter.com', label: 'Twitter' },
    { id: 3, icon: <FaInstagram />, url: 'https://instagram.com', label: 'Instagram' },
    { id: 4, icon: <FaLinkedinIn />, url: 'https://linkedin.com', label: 'LinkedIn' },
];

const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/product", label: "Shop" },
    { to: "/blog", label: "Blogs" },
    { to: "/contact", label: "Contact" },
    { to: "/faq", label: "FAQ" }
];

const categoryLinks = [
    { to: "/product", label: "Computer Accessories" },
    { to: "/product", label: "Shoes Collection" },
    { to: "/product", label: "Men's Fashion" },
    { to: "/product", label: "Watches" },
    { to: "/product", label: "Women's Fashion" },
    { to: "/product", label: "Electronics" }
];


const ScrollToTopLink = ({ to, children, className }) => {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Link to={to} onClick={handleClick} className={`text-gray-600 hover:text-black transition-colors duration-200 ${className}`}>
            {children}
        </Link>
    );
};



const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <footer className='bg-[#fff] text-gray-800 font-sans border-t border-gray-200'>
            <div className='container mx-auto px-6 py-16'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold text-black">E-SHOP</h1>
                        <p className="text-gray-600 leading-relaxed">
                            Discover curated outfits and cutting-edge electronics. We blend style and innovation to elevate your everyday.
                        </p>
                        <div className="flex gap-4 mt-2">
                            {socialLinks.map(link => (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={link.label}
                                    className="text-gray-500 hover:text-black transition-colors duration-200 text-xl"
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h2 className="text-lg font-semibold text-black mb-2">Quick Links</h2>
                        {quickLinks.map(link => (
                            <ScrollToTopLink key={link.label} to={link.to}>{link.label}</ScrollToTopLink>
                        ))}
                    </div>

                    <div className="flex flex-col gap-3">
                        <h2 className="text-lg font-semibold text-black mb-2">Top Categories</h2>
                        {categoryLinks.map(link => (
                            <ScrollToTopLink key={link.label} to={link.to}>{link.label}</ScrollToTopLink>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4">
                        <h2 className="text-lg font-semibold text-black mb-2">Newsletter</h2>
                        <p className="text-gray-600">
                            Subscribe for exclusive deals and new arrivals.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="py-2 px-4 w-full rounded-md border border-gray-300 bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
                                aria-label="Your email for newsletter"
                            />
                            <button
                                type="submit"
                                className="bg-black text-white py-2 px-6 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-200"
                            >
                                Go
                            </button>
                        </form>
                    </div>
                </div>

                <hr className='border-gray-200 my-10' />
                
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm'>
                    {contactInfo.map((info) => (
                        <div key={info.id} className='flex items-center gap-4'>
                            {info.icon}
                            <div>
                                <h3 className='font-semibold text-black'>{info.title}</h3>
                                <p className='text-gray-600'>{info.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className='bg-gray-200 py-4'>
                 <div className='container mx-auto px-6 text-center text-gray-600 text-sm'>
                    <p>&copy; {new Date().getFullYear()} E-SHOP. All rights reserved.</p>
                    <p className="mt-1 text-xs">Created by Taha Siraj</p>
                </div>
            </div>

            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className='fixed bottom-5 right-5 z-50 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 focus:outline-none'
                    aria-label="Scroll to top"
                >
                    <BiSolidUpArrowSquare className='text-2xl' />
                </button>
            )}
        </footer>
    );
};

export default Footer;