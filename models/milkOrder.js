const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	plan: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		required: true
	},
	totalAmount: {
		type: Number,
		required: true
	},
	planStartDate: {
		type: String,
		required: true
	},
	planEndDate: {
		type: String,
		required: true
	},
	address: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Order', orderSchema);
