import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, Flame, Leaf, Heart, Menu, X, Search, Star } from 'lucide-react';

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Carousel images
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=1200&h=400&fit=crop",
      title: "Delicious Homemade Pizza",
      subtitle: "Fresh ingredients, authentic taste"
    },
    {
      url: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=400&fit=crop",
      title: "Fresh Garden Salads",
      subtitle: "Healthy and nutritious meals"
    },
    {
      url: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&h=400&fit=crop",
      title: "Gourmet Pasta Dishes",
      subtitle: "Comfort food at its finest"
    }
  ];

  // Vegetarian recipes
  const vegetarianRecipes = [
    {
      id: 1,
      name: "Mediterranean Quinoa Bowl",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=450&h=300&fit=crop",
      calories: 340,
      cookingTime: "25 mins",
      specialty: "Gluten Free",
      rating: 4.8,
      difficulty: "Easy"
    },
    {
      id: 2,
      name: "Avocado Toast Supreme",
      image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=450&h=300&fit=crop",
      calories: 280,
      cookingTime: "10 mins",
      specialty: "High Protein",
      rating: 4.6,
      difficulty: "Easy"
    },
    {
      id: 3,
      name: "Spicy Thai Curry",
      image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=450&h=300&fit=crop",
      calories: 420,
      cookingTime: "35 mins",
      specialty: "Vegan",
      rating: 4.9,
      difficulty: "Medium"
    },
    {
      id: 4,
      name: "Mushroom Risotto",
      image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=450&h=300&fit=crop",
      calories: 380,
      cookingTime: "40 mins",
      specialty: "Creamy Delight",
      rating: 4.7,
      difficulty: "Hard"
    }
  ];

  // Non-vegetarian recipes
  const nonVegRecipes = [
    {
      id: 5,
      name: "Grilled Salmon Fillet",
      image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=450&h=300&fit=crop",
      calories: 450,
      cookingTime: "20 mins",
      specialty: "Omega-3 Rich",
      rating: 4.9,
      difficulty: "Medium"
    },
    {
      id: 6,
      name: "BBQ Chicken Wings",
      image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=450&h=300&fit=crop",
      calories: 520,
      cookingTime: "45 mins",
      specialty: "Smoky Flavor",
      rating: 4.8,
      difficulty: "Easy"
    },
    {
      id: 7,
      name: "Beef Stir Fry",
      image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=450&h=300&fit=crop",
      calories: 390,
      cookingTime: "15 mins",
      specialty: "Quick & Easy",
      rating: 4.5,
      difficulty: "Easy"
    },
    {
      id: 8,
      name: "Seafood Paella",
      image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=450&h=300&fit=crop",
      calories: 480,
      cookingTime: "50 mins",
      specialty: "Spanish Classic",
      rating: 4.9,
      difficulty: "Hard"
    }
  ];

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'recipes', label: 'Recipes' },
    { id: 'categories', label: 'Categories' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'recipes') {
      const recipesSection = document.getElementById('recipes-section');
      if (recipesSection) {
        recipesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const RecipeCard = ({ recipe, isVeg }) => (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
         style={{ width: '100%', maxWidth: '450px', aspectRatio: '1/1' }}>
      <div className="relative h-3/5 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {isVeg ? (
            <div className="bg-green-500 text-white px-3 py-1 rounded-full flex items-center text-xs font-bold shadow-lg transform transition-transform duration-300 hover:scale-110">
              <Leaf className="w-3 h-3 mr-1" />
              VEG
            </div>
          ) : (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full flex items-center text-xs font-bold shadow-lg transform transition-transform duration-300 hover:scale-110">
              <Heart className="w-3 h-3 mr-1" />
              NON-VEG
            </div>
          )}
          
          <div className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full flex items-center text-xs font-bold shadow-lg">
            <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
            {recipe.rating}
          </div>
        </div>

        {/* Difficulty badge */}
        <div className="absolute top-4 left-4">
          <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
            recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {recipe.difficulty}
          </div>
        </div>
      </div>
      
      <div className="p-6 h-2/5 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-xl text-gray-800 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2">
            {recipe.name}
          </h3>
          
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-orange-600 bg-orange-50 px-3 py-2 rounded-lg transition-colors duration-300 group-hover:bg-orange-100">
              <Flame className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">{recipe.calories} cal</span>
            </div>
            
            <div className="flex items-center text-blue-600 bg-blue-50 px-3 py-2 rounded-lg transition-colors duration-300 group-hover:bg-blue-100">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">{recipe.cookingTime}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-xl text-sm font-semibold text-center transform transition-all duration-300 group-hover:from-purple-200 group-hover:to-pink-200 group-hover:shadow-md">
          {recipe.specialty}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
              <div className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white p-3 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-110">
                <span className="font-bold text-2xl">🍳</span>
              </div>
              <span className="ml-4 text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                RecipeHub
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative font-semibold transition-all duration-300 py-2 px-4 rounded-lg ${
                    activeSection === item.id
                      ? 'text-orange-600 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full" />
                  )}
                </button>
              ))}
            </nav>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-300">
                <Search className="w-6 h-6" />
              </button>
              
              {/* Mobile menu button */}
              <button 
                className="lg:hidden p-2 text-gray-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-md">
              <nav className="flex flex-col space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left font-medium transition-all duration-300 py-3 px-4 rounded-lg ${
                      activeSection === item.id
                        ? 'text-orange-600 bg-orange-50'
                        : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Carousel */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        {carouselImages.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide ? 'translate-x-0 opacity-100' : 
              index < currentSlide ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'
            }`}
          >
            <img 
              src={slide.url} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-6">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4 transform transition-transform duration-700 hover:scale-105">
                  {slide.title}
                </h2>
                <p className="text-xl lg:text-2xl opacity-90">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>
        
        <button 
          onClick={nextSlide}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:scale-110"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
        
        {/* Carousel indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentSlide ? 'bg-white shadow-lg' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Recipe Sections */}
      <div id="recipes-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Vegetarian Recipes */}
        <section className="mb-20">
          <div className="flex items-center justify-center mb-12">
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-full mr-6 shadow-lg">
              <Leaf className="w-10 h-10 text-green-600" />
            </div>
            <div className="text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2">Vegetarian Delights</h2>
              <p className="text-gray-600 text-lg">Fresh, healthy, and absolutely delicious plant-based recipes</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
            {vegetarianRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} isVeg={true} />
            ))}
          </div>
        </section>

        {/* Non-Vegetarian Recipes */}
        <section>
          <div className="flex items-center justify-center mb-12">
            <div className="bg-gradient-to-r from-red-100 to-pink-100 p-4 rounded-full mr-6 shadow-lg">
              <Heart className="w-10 h-10 text-red-600" />
            </div>
            <div className="text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-2">Non-Vegetarian Favorites</h2>
              <p className="text-gray-600 text-lg">Rich, flavorful, and protein-packed meat and seafood dishes</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 justify-items-center">
            {nonVegRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} isVeg={false} />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-3 rounded-xl">
              <span className="font-bold text-2xl">🍳</span>
            </div>
            <span className="ml-4 text-3xl font-bold">RecipeHub</span>
          </div>
          <p className="text-gray-400 text-lg">Discover amazing recipes and create delicious memories</p>
          <p className="text-gray-500 mt-4">© 2025 RecipeHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;