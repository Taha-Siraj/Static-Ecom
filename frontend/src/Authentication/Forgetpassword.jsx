import React, { useState } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios';
import {Link} from 'react-router-dom'
import api from '../Api';

const Forgetpassword = () => {
    const [step , setstep] = useState(1);
    const [email , setEmail] = useState('');
    const [otp , setOtp] = useState('');
    const [password , setpassword] = useState('');
    const [loader , setLoader] = useState(false);
    
    const sendOtp = async () => {
        if(!email){
            toast.error("Please enter your email");
            return;
        }
        try {
            setLoader(true);
            let res = await api.post('/forget-password' ,{
                email
            })
            setstep(2)
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
        } finally {
            setLoader(false);   
        }
    }
    const VerifyOtp = async () => {
        try {
            setLoader(true);
            let res = await api.post('/verify-otp', {
                email,
                otp
            })
            console.log(res.data)
            toast.success(res.data.message)
            setstep(3)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
        } finally {
            setLoader(false);
        }
    }
    const updatedpassword = async () => {
        try {
            setLoader(true);
            let res = await api.put('/updated-password', {
                email,
                password
            })
            toast.success(res.data.message)
            setstep(4)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
        } finally {
            setLoader(false);
        }
    }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans p-4">
       <Toaster position="top-center" richColors />
      <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg' >
        <h1 className="text-2xl font-bold text-center">
          {step === 1 && 'Forgot Password'}
          {step === 2 && 'Verify OTP'}
          {step === 3 && 'Change Password'}
          {step === 4 && 'Success'}
        </h1>
        {step === 1 && (
          <>
            <p className="text-sm text-center text-gray-600">Enter your email to receive an OTP.</p>
            <div className="space-y-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="border border-gray-300 p-2 rounded-md w-full"
                placeholder="Email"
              />
              <button onClick={sendOtp} className="bg-blue-500 text-white p-2 rounded-md w-full disabled:opacity-60">
                {loader ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          </>
        )}
        {step === 2 && (
            <>
              <p className="text-sm text-center text-gray-600">Enter the OTP sent to your email.</p>
              <div className="space-y-4">
                <input
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  type="text"
                  className="border border-gray-300 p-2 rounded-md w-full"
                  placeholder="OTP"
                />
                <button onClick={VerifyOtp} className="bg-blue-500 text-white p-2 rounded-md w-full disabled:opacity-60">
                    {loader ? 'Verifying...' : 'Verify OTP'}
                </button>
              </div>
            </>
        )}
        {step === 3 && (
            <div>
                <p>Enter your new password.</p>
                <div className="space-y-4">
                    <input
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        type="password"
                        className="border border-gray-300 p-2 rounded-md w-full"
                        placeholder="New Password"
                    />
                    <button 
                    onClick={updatedpassword}
                    className="bg-blue-500 text-white p-2 rounded-md w-full">
                        {loader ? 'Changing...' : 'Change Password'}
                    </button>
                </div>
            </div>
        )}
        {step === 4 && (
          <div className="text-center space-y-3 py-2">
            <div className="mx-auto w-20 h-20 flex items-center justify-center bg-green-100 rounded-full">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Password Reset!</h1>
            <p className="text-gray-600">Your password has been changed successfully.</p>
            <Link to="/login" className="inline-block w-full p-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors">
              Go to Login
            </Link>
          </div>
        )}
      </div>
        
    </div>
  )
}

export default Forgetpassword
