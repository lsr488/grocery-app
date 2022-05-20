const express = require('express');
const router = express.Router();
const { createRecipe, getRecipes, deleteRecipe } = require('../controllers/recipeController');

router.route('/')
	.post(createRecipe)
	.get(getRecipes);

router.route('/:id')
	.delete(deleteRecipe);

module.exports = router;