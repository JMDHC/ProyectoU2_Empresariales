var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	nc: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	career: {
		type: String,
		required: true,
	},
	grade: {
		type: Number,
		required: true
	},
	email: {
		type: String,
		match: /.+@.+\..+/,
		lowercase: true
	},
	sendmail:{
		type: Boolean,
		default: false
	}
});