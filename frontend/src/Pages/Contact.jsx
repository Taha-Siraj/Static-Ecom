import React from "react";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

const Contact = () => {
  return (
    <div className="pt-24 pb-16 w-full font-poppins bg-gray-50">
      <div className="relative w-full">
        <img
          src="hero2.jpg"
          alt="Contact Banner"
          className="w-full h-[220px] sm:h-[280px] md:h-[350px] object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/40 flex justify-center items-center rounded-lg">
          <h1 className="text-3xl sm:text-5xl font-bold text-white">Contact Us</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 px-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Get in Touch</h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            We’d love to hear from you! Whether you have a question, feedback, or
            just want to say hello, feel free to reach out using the form or our
            contact details below.
          </p>

          <div className="flex flex-col gap-4 text-gray-700 text-sm md:text-base">
            <p className="flex items-center gap-2">
              <MdLocationOn className="text-green-700 text-xl" /> Karachi, Pakistan
            </p>
            <p className="flex items-center gap-2">
              <MdEmail className="text-green-700 text-xl" /> tahaSiraj610@gmail.com
            </p>
            <p className="flex items-center gap-2">
              <MdPhone className="text-green-700 text-xl" /> +92 312345689
            </p>
          </div>

         
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900">Send us a Message</h3>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="ex.Taha Siraj"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
            <input
              type="email"
              placeholder="ex. tahaSiraj610@gmail.com"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 outline-none resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-green-700 text-white font-medium rounded-lg py-2 hover:bg-green-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
