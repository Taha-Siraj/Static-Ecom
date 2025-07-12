import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import './signup.css'
import { GlobalContext } from '../Context/Context';
import api from '../Api';

const Signup = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const {state } = useContext(GlobalContext)
  
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().min(8, 'At least 8 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoader(true);
        const res = await api.post(`/signup`, values);
        toast.success("Successfully created account!");
        setTimeout(() => navigate("/login"), 1500);
      } catch (error) {
        toast.error(error.response?.data?.message);
      } finally {
        setLoader(false);
      }
    }
  });

  useGSAP(() => {
  gsap.from("#signup",{
    scale: 1.5,
    opacity: 0,
    duration: 1,
   }) 
  })

  return (
    <>
      <Toaster position="top-center" richColors />
      <div id='signup-bg' className="h-screen mt-20 flex  items-center justify-evenly bg-[#F3F4F6] font-poppins">
        <div id='signup' className="rounded-lg border-[0.5px] border-[#dadadaa0] w-full bg flex justify-center flex-col bg-[#FFFFFF] max-w-sm p-4">
          <h2 className="text-2xl font-bold text-center text-[#6b6b6b]">Create Your Account</h2>
          
          <form onSubmit={formik.handleSubmit} className="flex justify-center flex-col gap-y-3">

            {["firstName", "lastName", "email", "password"].map((field, idx) => {
              const isPassword = field === "password";
              const label = field.charAt(0).toUpperCase() + field.slice(1).replace("Name", " Name");
              return (
                <div key={idx}>
                  <label className="text-sm text-[#ABABAD] font-semibold ">{label}</label>
                  <input
                    type={isPassword ? "password" : "text"}
                    name={field}
                    value={formik.values[field]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    className={`w-full px-3 py-1 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200 ${
                      formik.touched[field] && formik.errors[field] ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {formik.touched[field] && formik.errors[field] && (
                    <p className="text-sm text-red-500">{formik.errors[field]}</p>
                  )}
                </div>
              );
            })}

            <div className="flex justify-center items-center gap-x-2 text-md
         text-[#747686]">
              Already have an account?{" "}
              <Link to="/login" className="text-[#747686] no-underline  hover:underline">Login</Link>
            </div>

            <button
              type="submit"
              disabled={loader}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 disabled:opacity-60"
            >
              {loader ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
    </div>
    </>
  );
};

export default Signup;
