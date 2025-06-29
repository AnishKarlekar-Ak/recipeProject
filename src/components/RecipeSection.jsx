import React from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './recipeCard';
import { Leaf, Heart } from 'lucide-react';

const RecipeSection = ({ vegetarianRecipes, nonVegRecipes }) => {
  return (
    <div id="recipes-section" className="py-16 px-4 max-w-7xl mx-auto">
      {/* Vegetarian Section */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <Leaf className="w-10 h-10 text-green-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-800">Vegetarian Delights</h2>
          <p className="text-gray-600">Fresh, healthy, plant-based meals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {vegetarianRecipes.length > 0 ? (
            vegetarianRecipes.map((recipe) => (
                <RecipeCard recipe={recipe} isVeg={true} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No vegetarian recipes available.</p>
          )}
        </div>
      </section>

      {/* Non-Vegetarian Section */}
      <section>
        <div className="text-center mb-12">
          <Heart className="w-10 h-10 text-red-600 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-gray-800">Non-Vegetarian Favorites</h2>
          <p className="text-gray-600">Rich and protein-packed dishes</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {nonVegRecipes.length > 0 ? (
            nonVegRecipes.map((recipe) => (
                <RecipeCard recipe={recipe} isVeg={false} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">No non-veg recipes available.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default RecipeSection;
