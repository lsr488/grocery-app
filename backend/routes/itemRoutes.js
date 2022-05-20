const express = require('express');
const router = express.Router();
const { getItems, createItem, deleteItem } = require('../controllers/itemController');

// router.route('/')
// 	.post(createItem)
	
router.post('/', createItem);

router.get('/', getItems);

router.delete('/:id', deleteItem);

module.exports = router;