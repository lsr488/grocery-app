const express = require('express');
const router = express.Router();
const { createRecipe, getRecipes, deleteRecipe, updateRecipe } = require('../controllers/recipeController');

router.route('/')
	.post(createRecipe)
	.get(getRecipes);

router.route('/:id')
	.delete(deleteRecipe)
	.put(updateRecipe);

module.exports = router;