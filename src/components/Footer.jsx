import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="text-center">
        <div className="flex justify-center items-center mb-4">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 p-3 rounded-xl text-white">
            <span className="text-2xl">🍳</span>
          </div>
          <span className="ml-4 text-3xl font-bold">RecipeHub</span>
        </div>
        <p className="text-gray-400">Discover amazing recipes and create delicious memories</p>
        <p className="text-gray-500 mt-4">© 2025 RecipeHub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
