// models/Recipe.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  cookingTime: { type: String, required: true },
  calories: { type: Number, required: true },
  isVeg: { type: Boolean, required: true },
  allergen: { type: String },
  visitors: { type: Number, default: 0 },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: [commentSchema]
}, {
  timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;
