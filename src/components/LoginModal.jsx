import React, { useState } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async () => {
    try {
      setLoading(true);
      setMessage('');
      const response = await axios.post(
        'http://localhost:5000/api/users/send-otp',
        {
          name: form.name,
          email: form.email
        },
        {
          withCredentials: true // ✅ REQUIRED for session cookie
        }
      );

      if (response.data.success) {
        setStep(2);
        setMessage('OTP sent! Check your email.');
      } else {
        setMessage(response.data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      setMessage('');
      const response = await axios.post(
        'http://localhost:5000/api/users/verify-otp',
        {
          name: form.name,
          email: form.email,
          otp: form.otp
        },
        {
          withCredentials: true // ✅ REQUIRED for session creation
        }
      );
      
      if (response.data.user) {
        onLoginSuccess(response.data.user);
        onClose();
      } else {
        setMessage('Invalid OTP or expired.');
      }
    } catch (err) {
      setMessage(err.response?.data?.error || 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      await sendOtp();
    } else {
      await verifyOtp();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-[90%] max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {step === 1 ? 'Login or Register to RecipeHub' : 'Enter OTP'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                required
              />
            </>
          )}

          {step === 2 && (
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition"
          >
            {loading ? 'Please wait...' : step === 1 ? 'Send OTP' : 'Verify'}
          </button>

          {message && (
            <div className="text-sm text-center text-red-600 mt-2">{message}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
