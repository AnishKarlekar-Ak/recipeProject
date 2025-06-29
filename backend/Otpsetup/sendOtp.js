// backend/nodemailer/sendOtp.js
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// In-memory OTP store (use Redis or DB in production)
const otpStore = new Map();

// Configure the transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to 'smtp' and add host/port if needed
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Generates a 6-digit OTP and stores it temporarily.
 * Sends the OTP to the given email using configured SMTP.
 *
 * @param {string} email - User's email address.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function sendOtp(email) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

  otpStore.set(email, { otp, expiry });

  const mailOptions = {
    from: `RecipeHub <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Your OTP for RecipeHub Login',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 10px;">
        <h2>RecipeHub Login</h2>
        <p>Your OTP is:</p>
        <h1 style="color: #EF6C00">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: 'OTP sent successfully' };
  } catch (err) {
    return { success: false, message: err.message };
  }
}

/**
 * Verifies the provided OTP for the given email.
 *
 * @param {string} email
 * @param {string} otpInput
 * @returns {boolean}
 */
export function verifyOtpValue(email, otpInput) {
  const data = otpStore.get(email);
  if (!data) return false;

  const { otp, expiry } = data;

  if (Date.now() > expiry) {
    otpStore.delete(email);
    return false;
  }

  const isMatch = otp === otpInput;
  if (isMatch) otpStore.delete(email); // Clear OTP after successful verification
  return isMatch;
}
