import React from 'react'

const Forgetpassword = () => {
  return (
    <div>
      <h1> <b   >Forget Password</b></h1>
        <p>Enter your email to receive a verification code.</p>
        <form>
            <input type="email" placeholder='Enter your email' required />
            <button type='submit'>Send Verification Code</button>
        </form>
        <p>Enter the verification code sent to your email.</p>
        <form>
            <input type="text" placeholder='Enter verification code' required />
            <button type='submit'>Verify Code</button>
        </form>
        <p>A verification code has been sent to your email.</p>
        <p>Enter your new password.</p>
        <form>
            <input type="password" placeholder='Enter new password' required />
            <button type='submit'>Reset Password</button>
        </form>
        <p>New password has been set successfully.</p>
        <p>Go back to <a href="/login">Login</a></p>
        <p>Don't have an account? <a href="/register">Register</a></p>
                 
    </div>
  )
}

export default Forgetpassword
