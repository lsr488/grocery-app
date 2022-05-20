const asyncHandler = require('express-async-handler');
const Recipe = require('../models/recipeModel');

// @desc		Create new recipe
// @routes	POST /api/recipes
// @access	Public
const createRecipe = asyncHandler(async (req, res) => {
	const {name, notes, url} = req.body;

	if(!name) {
		res.status(400);
		throw new Error('Please add a name');
	}

	const recipe = await Recipe.create({
		name,
		notes,
		url
	});

	res.status(201).json(recipe);

});

// @desc		Get all items
// @routes	GET /api/items
// @access	Public
const getRecipes = asyncHandler(async (req, res) => {
	const recipes = await Recipe.find({});

	if(!recipes) {
		res.status(400);
		throw new Error('No recipes to display');
		console.log(error);
	}

	res.status(200).json(recipes);

});

module.exports = {
	createRecipe,
	getRecipes
}