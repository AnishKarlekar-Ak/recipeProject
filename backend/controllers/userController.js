// controllers/userController.js
import User from '../models/User.js';
import { sendOtp, verifyOtpValue } from '../Otpsetup/sendOtp.js';

const allowedRoles = ['User', 'Author', 'Admin'];

// 🔄 Combined registration or OTP sending logic
export const registerOrSendOtp = async (req, res) => {
  try {
    const { name, email, role = 'User' } = req.body;

    if (!email || !name) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    let user = await User.findOne({ email });

    // Register if not exists
    if (!user) {
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ error: 'Invalid role provided' });
      }
      user = new User({ name, email, role });
      await user.save();
    }

    const result = await sendOtp(email);
    if (result.success) {
      req.session.tempUser = { email };
      return res.status(200).json({ success: true, message: 'OTP sent to your email' });
    } else {
      return res.status(500).json({ error: result.message || 'Failed to send OTP' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// ✅ Legacy: Only for dedicated registration (not used now)
export const registerUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: 'Invalid role provided' });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const user = new User({ name, email, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login (step 1): Send OTP
export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not registered' });

    const result = await sendOtp(email);

    if (result.success) {
      req.session.tempUser = { email };
      // ✅ Add `success: true` here
      res.status(200).json({ success: true, message: 'OTP sent to your email' });
    } else {
      res.status(500).json({ success: false, error: result.message || 'Failed to send OTP' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// Login (step 2): Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, name } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const isValid = verifyOtpValue(email, otp);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid or expired OTP' });
    }

    // Check if user exists, otherwise register
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, role: 'user' }); // Default role: 'user'
      await user.save();
    }

    // Set session (optional if using session-based auth)
    req.session.user = {
  _id: user._id,
  email: user.email,
  name: user.name,
  role: user.role
};

req.session.save((err) => {
  if (err) {
    console.error('Session save error:', err);
    return res.status(500).json({ error: 'Session save failed' });
  }
  res.status(200).json({ message: 'Login successful', user: req.session.user });
});

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get currently logged-in user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.session.user?.id || req.session.user?._id;
    if (!userId) return res.status(401).json({ error: 'Not logged in' });

    const user = await User.findById(userId).select('-__v');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Logout user
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: 'Failed to logout' });
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logged out successfully' });
  });
};

// Admin only: Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin only: Get single user
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-__v');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Admin only: Delete user
export const deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


