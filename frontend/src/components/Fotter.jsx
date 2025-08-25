import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { BiSolidUpArrowSquare } from "react-icons/bi";

const socialLinks = [
  { icon: <FaFacebookF />, url: "https://facebook.com", label: "Facebook" },
  { icon: <FaTwitter />, url: "https://twitter.com", label: "Twitter" },
  { icon: <FaInstagram />, url: "https://instagram.com", label: "Instagram" },
  { icon: <FaLinkedinIn />, url: "https://linkedin.com", label: "LinkedIn" },
];

const pageLinks = [
  { to: "/", label: "Home" },
  { to: "/product", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const infoLinks = [
  { to: "/payment", label: "Payment Options" },
  { to: "/returns", label: "Returns" },
  { to: "/privacy", label: "Privacy Policies" },
  { to: "/newsletter", label: "Newsletter" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email) return alert("Please enter your email");
    console.log("Subscribed Email:", email);
    setEmail("");
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-screen-2xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand Info */}
        <div>
          <h1 className="text-3xl font-bold text-black">E-SHOP</h1>
          <p className="text-gray-600 mt-3">
            Discover curated outfits and cutting-edge electronics. 
            We blend style and innovation to elevate your everyday.
          </p>
          <div className="flex gap-4 mt-4">
            {socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-gray-500 hover:text-black text-xl transition"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Pages */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-3">Pages</h2>
          <div className="flex flex-col gap-2">
            {pageLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="text-gray-600 hover:text-black transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-3">Information</h2>
          <div className="flex flex-col gap-2">
            {infoLinks.map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="text-gray-600 hover:text-black transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-3">Newsletter</h2>
          <p className="text-gray-600 mb-3">
            Enter Your Email Address
          </p>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 min-w-0 py-2 px-4 rounded-md border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="bg-black text-white py-2 px-6 rounded-md font-semibold hover:bg-gray-800 transition w-full sm:w-auto"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-5 right-5 z-50 bg-black text-white p-2 rounded-full shadow-lg hover:bg-gray-800 transition"
          aria-label="Scroll to top"
        >
          <BiSolidUpArrowSquare className="text-2xl" />
        </button>
      )}
    </footer>
  );
};

export default Footer;
