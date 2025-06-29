// src/pages/Contact.jsx
import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-orange-600 mb-6">Contact Us</h1>

      <p className="text-lg mb-8">
        We'd love to hear from you! Feel free to send us your feedback, suggestions, or collaboration ideas.
      </p>

      <form className="space-y-6 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
          <textarea id="message" rows="5" className="mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"></textarea>
        </div>

        <button type="submit" className="bg-orange-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-700 transition">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
