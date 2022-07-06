const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	status: {
		type: String,
		default: 'false',
		required: true
	},
	isEditing: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Item', itemSchema);