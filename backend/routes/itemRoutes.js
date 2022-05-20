const express = require('express');
const router = express.Router();
const { getItems, createItem, deleteItem } = require('../controllers/itemController');

router.route('/')
	.post(createItem)
	.get(getItems)
	
router.route('/:id')
	.delete(deleteItem);

module.exports = router;