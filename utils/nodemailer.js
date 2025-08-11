import nodemailer from "nodemailer";
import 'dotenv/config';
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS
  }
});

export const sendVerificationEmail = async (email , token) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Your OTP Code",
    html:  `<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>Your OTP Code</title>
  <style>
    body {
      font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: #f4f6fb;
      margin: 0;
      padding: 24px;
      -webkit-text-size-adjust: 100%;
    }
    .container {
      max-width: 560px;
      margin: 32px auto;
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
      overflow: hidden;
      border: 1px solid #e2e8f0;
    }
    .header {
      padding: 22px 30px;
      background: linear-gradient(135deg, #0ea5e9, #06b6d4);
      color: #fff;
      text-align: center;
    }
    .brand {
      font-weight: 800;
      font-size: 20px;
      margin: 0;
      letter-spacing: 0.5px;
    }
    .body {
      padding: 28px 30px;
      color: #0f172a;
    }
    h1 {
      font-size: 22px;
      margin: 0 0 14px 0;
      font-weight: 700;
      color: #0f172a;
    }
    .otp {
      display: inline-block;
      padding: 16px 26px;
      font-size: 28px;
      letter-spacing: 8px;
      border-radius: 12px;
      background: linear-gradient(135deg, #0ea5e9, #06b6d4);
      color: #fff;
      font-weight: 800;
      margin: 16px 0;
      box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
    }
    p {
      color: #475569;
      margin: 8px 0 16px 0;
      line-height: 1.6;
      font-size: 15px;
    }
    .small {
      font-size: 13px;
      color: #94a3b8;
      margin-top: 12px;
    }
    .footer {
      padding: 18px 30px;
      background: #f8fafc;
      color: #64748b;
      font-size: 13px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    @media (max-width: 480px) {
      .otp {
        font-size: 22px;
        padding: 14px 20px;
        letter-spacing: 4px;
      }
      .body {
        padding: 22px 20px;
      }
      .header {
        padding: 18px 20px;
      }
    }
  </style>
</head>
<body>
  <div class="container" role="article" aria-label="One-time password">
    <div class="header">
      <p class="brand">${ 'Ecommerce websites'}</p>
    </div>

    <div class="body">
      <h1>Your OTP Code</h1>
      <p>Use the code below to complete your verification. This code will expire in ${process.env.OTP_EXPIRE_MIN || 10} minutes.</p>
      <div class="otp" aria-hidden="true">${token}</div>
      <p class="small">Do not share this code with anyone. We will never ask for your password.</p>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} ${ 'Ecommerce websites'}. All rights reserved.
    </div>
  </div>
</body>
</html>
`
  });
}; 