const express = require('express');
const router = express.Router();
const {createRecipe, getRecipes} = require('../controllers/recipeController');

router.post('/', createRecipe);

router.get('/', getRecipes);

module.exports = router;