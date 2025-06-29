import express from 'express';
import {
  registerOrSendOtp,
  verifyOtp,
  getUserProfile,
  logoutUser
} from '../controllers/userController.js';

import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Send OTP (login or register)
 * If the user exists, it acts as login initiation.
 * If the user does not exist, it creates a user and sends OTP.
 */
router.post('/send-otp', registerOrSendOtp);

/**
 * Verify OTP and log the user in
 */
router.post('/verify-otp', verifyOtp);

/**
 * Get logged-in user's profile (JWT required)
 */
router.get('/profile', isAuthenticated, getUserProfile);

/**
 * Logout user
 */
router.post('/logout', logoutUser);

export default router;
