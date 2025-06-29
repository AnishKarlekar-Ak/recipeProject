import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/recipeCard'; // ⬅️ RecipeCard handles Link internally

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    author: '',
    dietary: 'all',
    tags: '',
    ingredients: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load recipes.');
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  const handleChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const nameMatch = recipe.name.toLowerCase().includes(filters.name.toLowerCase());
    const authorMatch =
      filters.author === '' ||
      (recipe.authorId?.name || '').toLowerCase().includes(filters.author.toLowerCase());
    const tagMatch =
      filters.tags === '' ||
      (recipe.tags || []).some(tag =>
        tag.toLowerCase().includes(filters.tags.toLowerCase())
      );
    const ingredientMatch =
      filters.ingredients === '' ||
      (recipe.ingredients || []).some(ing =>
        ing.toLowerCase().includes(filters.ingredients.toLowerCase())
      );
    const dietaryMatch =
      filters.dietary === 'all' ||
      (filters.dietary === 'veg' && recipe.isVeg) ||
      (filters.dietary === 'non-veg' && !recipe.isVeg);

    return nameMatch && authorMatch && tagMatch && ingredientMatch && dietaryMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Explore All Recipes</h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 bg-white p-6 rounded-2xl shadow-md">
          <input
            type="text"
            name="name"
            placeholder="Search by recipe name"
            value={filters.name}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="author"
            placeholder="Search by author"
            value={filters.author}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg"
          />
          <select
            name="dietary"
            value={filters.dietary}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg"
          >
            <option value="all">All Diets</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-Vegetarian</option>
          </select>
          <input
            type="text"
            name="tags"
            placeholder="Search by tag"
            value={filters.tags}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg"
          />
          <input
            type="text"
            name="ingredients"
            placeholder="Search by ingredient"
            value={filters.ingredients}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Recipe Grid */}
        {loading ? (
          <div className="text-center text-gray-600 text-lg py-20">Loading recipes...</div>
        ) : error ? (
          <div className="text-center text-red-600 text-lg py-20">{error}</div>
        ) : filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} isVeg={recipe.isVeg} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg py-20">
            No recipes found matching your filters.
          </div>
        )}
      </section>
    </div>
  );
};

export default Recipes;
