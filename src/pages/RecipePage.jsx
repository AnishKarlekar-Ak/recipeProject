import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [commentInput, setCommentInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipeAndIncrementView = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`, {
          withCredentials: true,
        });
        setRecipe(res.data);

        await axios.patch(`http://localhost:5000/api/recipes/${id}/views`, {}, {
          withCredentials: true,
        });
      } catch (err) {
        console.error(err);
        setError('Failed to fetch recipe. It may not exist or something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeAndIncrementView();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!commentInput.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/api/recipes/${id}/comments`,
        { comment: commentInput },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setRecipe((prev) => ({
        ...prev,
        comments: res.data.comments,
      }));

      setCommentInput('');
      setError('');
    } catch (err) {
      console.error('Failed to submit comment:', err);
      if (err.response?.status === 401) {
        setError('You must be logged in to comment.');
      } else {
        setError('Something went wrong while submitting your comment.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading recipe...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="text-center py-20 text-xl text-red-500">
          {error || 'Recipe not found.'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 bg-white shadow-lg rounded-2xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Details</h2>
          <div><p className="text-sm text-gray-500">Cooking Time:</p><p className="font-semibold text-gray-800">{recipe.cookingTime}</p></div>
          <div><p className="text-sm text-gray-500">Calories:</p><p className="font-semibold text-orange-600">{recipe.calories} cal</p></div>
          <div><p className="text-sm text-gray-500">Dietary:</p><p className={`font-semibold ${recipe.isVeg ? 'text-green-600' : 'text-red-600'}`}>{recipe.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}</p></div>
          <div><p className="text-sm text-gray-500">Allergen Advice:</p><p className="font-medium text-gray-700">{recipe.allergen || 'None'}</p></div>
          <div><p className="text-sm text-gray-500">Visitors:</p><p className="font-semibold text-purple-600">{recipe.visitors || 0} views</p></div>
          <div><p className="text-sm text-gray-500">Ingredients:</p><ul className="list-disc list-inside text-gray-700 text-sm space-y-1">{recipe.ingredients.map((item, index) => (<li key={index}>{item}</li>))}</ul></div>
        </aside>

        {/* Main Content */}
        <main className="lg:col-span-6 bg-white shadow-lg rounded-2xl p-6">
          <img src={recipe.image} alt={recipe.name} className="w-full h-64 object-cover rounded-lg mb-6" />
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{recipe.name}</h1>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Instructions:</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2 text-base leading-relaxed">{recipe.instructions?.length > 0 ? recipe.instructions.map((step, index) => (<li key={index}>{step}</li>)) : (<li>Instructions not available.</li>)}</ol>

          <div className="mt-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Comments</h2>

            {/* Comment Form */}
            <div className="mb-4">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="w-full p-3 border rounded-lg resize-none"
                placeholder="Leave a comment..."
                rows="3"
              />
              <button
                onClick={handleCommentSubmit}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Post Comment
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            {/* Comment List */}
            <div className="space-y-4">
              {recipe.comments?.length > 0 ? (
                recipe.comments.map((c, index) => (
                  <div key={index} className="border border-gray-200 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 font-semibold">{c.userId?.name || 'User'}:</p>
                    <p className="text-gray-800">{c.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar: Author Info */}
        <aside className="lg:col-span-3 bg-white shadow-lg rounded-2xl p-6 text-center">
          <img src={recipe.authorId?.profileImage || 'https://via.placeholder.com/150'} alt={recipe.authorId?.name || 'Author'} className="w-24 h-24 mx-auto rounded-full object-cover mb-4" />
          <h3 className="text-xl font-bold text-gray-800">{recipe.authorId?.name || 'Anonymous'}</h3>
          <p className="text-gray-500 text-sm mb-2">Recipe Contributor</p>
          <div className="text-purple-600 font-semibold">~ Recipes Uploaded</div>
        </aside>
      </div>
    </div>
  );
};

export default RecipePage;
