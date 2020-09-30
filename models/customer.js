const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	mobile: {
		type: Number,
		required: true
	},
	order: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Order'
	}
});

module.exports = mongoose.model('Customer', customerSchema);
