import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Heart, Star, Flame, Clock } from 'lucide-react';

const RecipeCard = ({ recipe, isVeg }) => {
  return (
    <Link to={`/recipe/${recipe._id}`} className="block w-full">
      <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <div className={`px-3 py-1 rounded-full text-xs font-bold ${isVeg ? 'bg-green-500' : 'bg-red-500'} text-white flex items-center`}>
              {isVeg ? <Leaf className="w-3 h-3 mr-1" /> : <Heart className="w-3 h-3 mr-1" />}
              {isVeg ? 'VEG' : 'NON-VEG'}
            </div>
            <div className="bg-white text-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow flex items-center">
              <Star className="w-3 h-3 mr-1 text-yellow-500" />
              {recipe.rating || 'N/A'}
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 truncate">{recipe.name}</h3>
          <div className="flex justify-between mb-4 text-sm">
            <div className="flex items-center text-orange-600">
              <Flame className="w-4 h-4 mr-1" />
              {recipe.calories} cal
            </div>
            <div className="flex items-center text-blue-600">
              <Clock className="w-4 h-4 mr-1" />
              {recipe.cookingTime}
            </div>
          </div>
          <div className="text-sm text-purple-800 font-semibold bg-purple-100 px-3 py-1 rounded-lg text-center">
            {recipe.specialty || 'No Tag'}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
