import nodemailer from "nodemailer";
import 'dotenv/config';
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

export const sendVerificationEmail = async (email , otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    html: `<h3>Your OTP is: <b>${otp}</b></h3>
           <p>This OTP will expire in 10 minutes.</p>`
  });
};