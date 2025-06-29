// routes/recipeRoutes.js
import express from 'express';
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  incrementViews,
  addComment,
} from '../controllers/recipeController.js';

import { isAuthenticated, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);
router.patch('/:id/views', incrementViews);
router.post('/:id/comments', addComment);

// Protected routes
router.post('/', isAuthenticated, authorizeRoles('Author', 'Admin'), createRecipe);
router.put('/:id', isAuthenticated, authorizeRoles('Author', 'Admin'), updateRecipe);
router.delete('/:id', isAuthenticated, authorizeRoles('Admin'), deleteRecipe);

export default router;
