const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	status: {
		type: Boolean,
		default: false,
		required: true
	}
});

module.exports = mongoose.model('Item', itemSchema);