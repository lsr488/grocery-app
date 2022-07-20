const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	isChecked: {
		type: Boolean,
		default: false,
		required: true
	},
	isEditing: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Item', itemSchema);