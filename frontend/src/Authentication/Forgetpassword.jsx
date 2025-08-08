import React, { useState } from 'react';

const ForgetPassword = () => {
  // State to manage which step of the process the user is on
  // 1: Enter email, 2: Enter code, 3: Reset password, 4: Success
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleSendCode = (e) => {
    e.preventDefault();
    // Add logic here to send verification code to the email
    console.log('Sending verification code to:', email);
    setStep(2); // Move to the next step
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    // Add logic here to verify the code
    console.log('Verifying code...');
    setStep(3); // Move to the next step
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Add logic here to reset the password
    console.log('Resetting password...');
    setStep(4); // Move to the success step
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        
        {/* Step 1: Enter Email */}
        {step === 1 && (
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-800">Forgot Password?</h1>
            <p className="mt-2 text-center text-gray-600">No worries, we'll send you reset instructions.</p>
            <form onSubmit={handleSendCode} className="mt-8 space-y-6">
              <div>
                <label htmlFor="email" className="text-sm font-medium text-gray-700 sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                Send Verification Code
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Enter Verification Code */}
        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold text-center text-gray-800">Check your email</h1>
            <p className="mt-2 text-center text-gray-600">We've sent a 6-digit verification code to <b>{email}</b></p>
            <form onSubmit={handleVerifyCode} className="mt-8 space-y-6">
              <div>
                <label htmlFor="code" className="text-sm font-medium text-gray-700 sr-only">Verification Code</label>
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  className="w-full px-4 py-2 text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="------"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                Verify Code
              </button>
            </form>
          </div>
        )}

        {/* Step 3: Enter New Password */}
        {step === 3 && (
          <div>
            <h1 className="text-2xl font-bold text-center text-gray-800">Set New Password</h1>
            <p className="mt-2 text-center text-gray-600">Your new password must be different from previous ones.</p>
            <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
              <div>
                <label htmlFor="new-password" class="text-sm font-medium text-gray-700 sr-only">New Password</label>
                <input
                  id="new-password"
                  name="new-password"
                  type="password"
                  required
                  className="w-full px-4 py-2 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter new password"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                Reset Password
              </button>
            </form>
          </div>
        )}
        
        {/* Step 4: Success Message */}
        {step === 4 && (
          <div className="text-center">
             <svg className="mx-auto h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h1 className="mt-4 text-2xl font-bold text-gray-800">Password Reset!</h1>
            <p className="mt-2 text-gray-600">Your password has been reset successfully.</p>
            <div className="mt-6">
                <a href="/login" className="w-full inline-block px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
                    Go to Login
                </a>
            </div>
          </div>
        )}

        <hr className="my-6 border-gray-300" />
        
        <div className="text-sm text-center text-gray-600">
            <p>
                Don't have an account?{' '}
                <a href="/register" className="font-medium text-indigo-600 hover:underline">
                    Register
                </a>
            </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;