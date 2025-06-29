import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search, PlusCircle, LogIn, LogOut } from 'lucide-react';

const Header = ({ isAuthor = false, user, onLoginClick, onLogoutClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'recipes', label: 'Recipes' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNav = (id) => {
    navigate(id === 'home' ? '/' : `/${id}`);
    setMobileMenuOpen(false);
  };

  const handleSearchClick = () => {
    navigate('/recipes');
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-600">
          RecipeHub
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="relative font-semibold transition-all duration-300 py-2 px-4 rounded-lg text-gray-700 bg-white hover:text-orange-600 hover:border hover:border-orange-200"
            >
              {item.label}
            </button>
          ))}

          {isAuthor && (
            <button
              onClick={() => navigate('/add-recipe')}
              className="ml-4 inline-flex items-center px-4 py-2 text-sm font-semibold text-green-600 bg-white border border-green-400 rounded-lg shadow-sm hover:bg-green-50 transition-all duration-300"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Add Recipe
            </button>
          )}

          <button
            onClick={handleSearchClick}
            className="p-2 text-gray-600 bg-white border hover:text-orange-600 hover:border-orange-300 rounded-lg"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Logged in user */}
          {user ? (
            <div className="ml-4 flex items-center space-x-2">
              <span className="px-3 py-2 text-sm text-gray-700 font-semibold bg-gray-100 border border-gray-200 rounded-lg">
                Hello, {user.name}
              </span>
              <button
                onClick={onLogoutClick}
                className="px-3 py-2 text-sm font-semibold text-red-600 bg-white border border-red-400 rounded-lg shadow-sm hover:bg-red-50 transition"
              >
                <LogOut className="w-4 h-4 inline-block mr-1" />
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="ml-4 px-4 py-2 text-sm font-semibold text-blue-600 bg-white border border-blue-400 rounded-lg shadow-sm hover:bg-blue-50 transition"
            >
              <LogIn className="w-4 h-4 inline-block mr-2" />
              Login
            </button>
          )}
        </nav>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-700 bg-white border hover:text-orange-600 hover:border-orange-300 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className="text-left font-medium py-3 px-4 rounded-lg text-gray-700 bg-white hover:text-orange-600 hover:border hover:border-orange-200"
              >
                {item.label}
              </button>
            ))}

            {isAuthor && (
              <button
                onClick={() => {
                  navigate('/add-recipe');
                  setMobileMenuOpen(false);
                }}
                className="text-left mt-2 font-semibold py-3 px-4 rounded-lg text-green-600 bg-white border border-green-400 hover:bg-green-50"
              >
                <PlusCircle className="w-5 h-5 inline-block mr-2" />
                Add Recipe
              </button>
            )}

            {user ? (
              <button
                onClick={() => {
                  onLogoutClick();
                  setMobileMenuOpen(false);
                }}
                className="text-left mt-2 font-semibold py-3 px-4 rounded-lg text-red-600 bg-white border border-red-400 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5 inline-block mr-2" />
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  onLoginClick();
                  setMobileMenuOpen(false);
                }}
                className="text-left mt-2 font-semibold py-3 px-4 rounded-lg text-blue-600 bg-white border border-blue-400 hover:bg-blue-50"
              >
                <LogIn className="w-5 h-5 inline-block mr-2" />
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
