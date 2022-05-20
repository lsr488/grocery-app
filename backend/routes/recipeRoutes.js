const express = require('express');
const router = express.Router();
const {createRecipe, getRecipes} = require('../controllers/recipeController');

router.route('/')
	.post(createRecipe)
	.get(getRecipes);

module.exports = router;