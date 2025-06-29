// controllers/recipeController.js
import Recipe from '../models/Recipe.js';

export const createRecipe = async (req, res) => {
  try {
    const recipe = new Recipe({
      ...req.body,
      authorId: req.session.user._id // store the creator's ID
    });
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate('authorId', 'name')
      .populate('comments.userId', 'name');
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('authorId', 'name')
      .populate('comments.userId', 'name');
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const incrementViews = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Recipe.findByIdAndUpdate(
      id,
      { $inc: { visitors: 1 } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Recipe not found' });
    res.status(200).json({ message: 'View count incremented' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Add a comment to a recipe
export const addComment = async (req, res) => {
  try {
    const { comment } = req.body;

    // Check session user
    if (!req.session?.user || !req.session.user._id) {
      return res.status(401).json({ error: 'You must be logged in to comment.' });
    }

    if (!comment || comment.trim() === '') {
      return res.status(400).json({ error: 'Comment cannot be empty.' });
    }

    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Add new comment to recipe
    recipe.comments.push({
      userId: req.session.user._id,
      comment: comment.trim()
    });

    await recipe.save();

    // Populate author info for response
    const updatedRecipe = await Recipe.findById(recipe._id)
      .populate('comments.userId', 'name');

    res.status(201).json({
      message: 'Comment added successfully',
      comments: updatedRecipe.comments
    });
  } catch (err) {
    console.error('Comment Error:', err);
    res.status(500).json({ error: 'Failed to add comment.' });
  }
};

