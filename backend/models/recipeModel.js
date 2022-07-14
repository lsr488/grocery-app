const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	notes: {
		type: String,
		required: false
	},
	url: {
		type: String,
		required: false
	},
	isEditing: {
		type: Boolean,
		required: false
	}
});

module.exports = mongoose.model('Recipe', recipeSchema);
