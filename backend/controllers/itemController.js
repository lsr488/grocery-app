const asyncHandler = require('express-async-handler');
const Item = require('../models/itemModel');

// @desc		Create new items
// @routes	POST /api/items
// @access	Public
const createItem = asyncHandler(async (req, res) => {
	const {name} = req.body
	console.log(req.body);

	if(!name) {
		res.status(400)
		throw new Error('Please add a name')
	}

	const item = await Item.create({
		name
	})

	res.status(201).json(item);
})

// @desc		Get all items
// @routes	GET /api/items
// @access	Public
const getItems = asyncHandler(async (req, res) => {
	const items = await Item.find({})

	if(!items) {
		res.status(404)
		throw new Error('No items to display')
	}

	res.status(200).json(items);
})

module.exports = {
	createItem,
	getItems
}