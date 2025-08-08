import React, { useState } from 'react'; // <-- CORRECTED: Was incorrectly importing from 'axios'
import axios from 'axios';                 // <-- This is the correct import for axios
import { Toaster, toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
    // State for managing UI steps and data
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password, 4: Success
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();

    // --- API Handlers ---

    // Step 1: Send the verification code to the user's email
    const handleSendCode = async (e) => {
        e.preventDefault();
        if (!email) {
            toast.error('Please enter your email address.');
            return;
        }
        setLoader(true);
        setStep(2); // Move to OTP screen
        // try {
        //     const res = await axios.post('http://localhost:5004/api/v1/send-reset-code', { email });
        //     if (res.status === 200) {
        //         toast.success(res.data.message || 'Verification code sent successfully!');
        //     }
        // } catch (error) {
        //     toast.error(error.response?.data?.message || 'Failed to send code.');
        // } finally {
        //     setLoader(false);
        // }
    };

    // Step 2: Verify the OTP code the user entered
    const handleVerifyCode = async (e) => {
        e.preventDefault();
        if (!otp || otp.length < 6) {
            toast.error('Please enter the 6-digit verification code.');
            return;
        }
        setLoader(true);
        try {
            const res = await axios.post('http://localhost:5004/api/v1/verify-otp', { email, otp });
            if (res.status === 200) {
                toast.success(res.data.message || 'Code verified!');
                setStep(3); // Move to New Password screen
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Invalid or expired code.');
        } finally {
            setLoader(false);
        }
    };

    // Step 3: Reset the password with the new password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!newPassword || newPassword.length < 6) {
            toast.error('Password must be at least 6 characters long.');
            return;
        }
        setLoader(true);
        try {
            const res = await axios.post('http://localhost:5004/api/v1/reset-password', { email, otp, newPassword });
            if (res.status === 200) {
                toast.success(res.data.message || 'Password reset successfully!');
                setStep(4); // Move to Success screen
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to reset password.');
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
            <Toaster position="top-center" richColors />
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">

                {/* --- Step 1: Enter Email --- */}
                {step === 1 && (
                    <div>
                        <h1 className="text-3xl font-bold text-center text-gray-800">Forgot Password?</h1>
                        <p className="mt-2 text-center text-gray-600">No worries, we'll send you reset instructions.</p>
                        <form onSubmit={handleSendCode} className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="email" className="text-sm font-medium text-gray-700 sr-only">Email address</label>
                                <input
                                    id="email" type="email" autoComplete="email" required
                                    value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-2.5 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <button type="submit" disabled={loader} className="w-full px-4 py-2.5 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed">
                                {loader ? 'Sending...' : 'Send Verification Code'}
                            </button>
                        </form>
                    </div>
                )}

                {/* --- Step 2: Enter Verification Code --- */}
                {step === 2 && (
                    <div>
                        <h1 className="text-2xl font-bold text-center text-gray-800">Check your email</h1>
                        <p className="mt-2 text-center text-gray-600">We've sent a 6-digit verification code to <br /><b>{email}</b></p>
                        <form onSubmit={handleVerifyCode} className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="code" className="text-sm font-medium text-gray-700 sr-only">Verification Code</label>
                                <input
                                    id="code" type="text" required maxLength="6"
                                    value={otp} onChange={(e) => setOtp(e.target.value)}
                                    className="w-full px-4 py-2.5 text-lg tracking-[1rem] text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="------"
                                />
                            </div>
                            <button type="submit" disabled={loader} className="w-full px-4 py-2.5 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed">
                                {loader ? 'Verifying...' : 'Verify Code'}
                            </button>
                        </form>
                         <div className="text-center mt-4">
                            <button onClick={() => setStep(1)} className="text-sm text-indigo-600 hover:underline">
                                Go back to change email
                            </button>
                        </div>
                    </div>
                )}

                {/* --- Step 3: Enter New Password --- */}
                {step === 3 && (
                     <div>
                        <h1 className="text-2xl font-bold text-center text-gray-800">Set New Password</h1>
                        <p className="mt-2 text-center text-gray-600">Your new password must be at least 6 characters long.</p>
                        <form onSubmit={handleResetPassword} className="mt-8 space-y-6">
                            <div>
                                <label htmlFor="new-password" class="text-sm font-medium text-gray-700 sr-only">New Password</label>
                                <input
                                    id="new-password" type="password" required
                                    value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2.5 text-gray-900 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <button type="submit" disabled={loader} className="w-full px-4 py-2.5 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed">
                                {loader ? 'Saving...' : 'Reset Password'}
                            </button>
                        </form>
                    </div>
                )}

                {/* --- Step 4: Success Message --- */}
                {step === 4 && (
                    <div className="text-center">
                        <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <h1 className="mt-4 text-2xl font-bold text-gray-800">Password Reset!</h1>
                        <p className="mt-2 text-gray-600">Your password has been reset successfully.</p>
                        <div className="mt-6">
                            <button onClick={() => navigate('/login')} className="w-full inline-block px-4 py-2.5 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300">
                                Go to Login
                            </button>
                        </div>
                    </div>
                )}

                <hr className="my-6 border-gray-200" />
                <div className="text-sm text-center text-gray-600">
                    <p>
                        Remember your password?{' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;