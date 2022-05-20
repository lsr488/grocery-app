const express = require('express');
const router = express.Router();
const {getItems, createItem} = require('../controllers/itemController');

// router.route('/')
// 	.post(createItem)
	
router.post('/', createItem);

router.get('/', getItems);


module.exports = router;