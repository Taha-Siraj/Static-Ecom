import React, { useState } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import api from '../Api';
import axios from 'axios';

const Forgetpassword = () => {
    const [step , setstep] = useState(1);
    const [email , setEmail] = useState('')
    const [otp , setOtp] = useState('')
    
    const sendOtp = async () => {
        if(!email){
            toast.error("Please enter your email");
            return;
        }
        try {
            let res = await axios.post('http://localhost:5004/api/v1/forget-password' ,{
                email
            })
            setstep(2)
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
        }
    }
    const VerifyOtp = async () => {
        try {
            let res = await axios.post('http://localhost:5004/api/v1/verify-otp', {
                email,
                otp
            })
            console.log(res.data)
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error.response.data.message)
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
                {'Send OTP'}
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
                  {'Verify OTP'}
                </button>
              </div>
            </>
        )}
    
      </div>
        
    </div>
  )
}

export default Forgetpassword
