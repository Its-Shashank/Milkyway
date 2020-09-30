const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const auth = require('../middlewares/check-auth');
// order model
const Order = require('../models/milkOrder');
const Customer = require('../models/customer');

// Create a new order

router.post('/:customerId', auth, async (req, res) => {
	try {
		const order = new Order(req.body);
		const customer = Customer.findById(req.params.customerId);
		await order.save();
		customer.then((result) => {
			result.order = order._id;
			result.save();
			res.status(200).json({ result, order });
		});
	} catch (e) {
		res.status(500).json(e);
	}
});

// Get all orders

router.get('/all', auth, (req, res) => {
	Order.find()
		.exec()
		.then((result) => {
			res.status(201).json({ result });
		})
		.catch((err) => {
			res.status(404).json({ err });
		});
});

// Delete an order
router.delete('/:orderId', auth, (req, res) => {
	Order.deleteOne({ _id: req.params.orderId })
		.then((result) => {
			let message;
			if (result.deletedCount !== 0) {
				message = 'Order removed successfully';
			} else {
				message = 'Order not found';
			}
			res.status(201).json({
				message
			});
		})
		.catch((err) => {
			res.status(404).json({ err });
		});
});

module.exports = router;
