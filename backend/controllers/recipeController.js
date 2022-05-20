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
	}

	res.status(200).json(recipes);

});

// @desc		Delete a item
// @routes	DELETE /api/recipes/:id
// @access	Public
const deleteRecipe = asyncHandler(async (req, res) => {
	const recipe = await Recipe.findById(req.params.id);

	if(!recipe) {
		res.status(404);
	}

	await recipe.remove();

	res.status(200).json({success: true});
});

// @desc		Delete a item
// @routes	DELETE /api/recipes/:id
// @access	Public
const updateRecipe = asyncHandler(async (req, res) => {
	const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body);

	if(!recipe) {
		res.status(404);
	}

	res.status(200).json(recipe);
})

module.exports = {
	createRecipe,
	getRecipes,
	deleteRecipe,
	updateRecipe
}