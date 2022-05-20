const express = require('express');
const router = express.Router();
const { getItems, createItem, deleteItem, updateItem } = require('../controllers/itemController');

router.route('/')
	.post(createItem)
	.get(getItems)
	
router.route('/:id')
	.delete(deleteItem)
	.put(updateItem);

module.exports = router;