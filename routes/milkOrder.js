const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
// order model
const Order = require('../models/milkOrder')

// Create a new order
router.post('/', (req, res) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        milkType: req.body.milkType,
        quantity: req.body.quantity,
        deliveryTime: req.body.deliveryTime,
        address: req.body.address,
        contact: req.body.contact
    })
    let price
    if (order.milkType === 'Full cream') {
        price = 28
    }
    if (order.milkType === 'Toned'){
        price = 25
    }
    const amount = price * order.quantity
    order.save()
    .then(result => {
        res.status(201).json({
            message: 'Order placed successfully',
            result,
            totalAmountToBePaid: amount
        })
    })
    .catch(err => {
        res.status(500).json({err})
    })
})

// Get all orders

router.get('/', (req, res) => {
    Order.find()
    .exec()
    .then(result => {
        res.status(201).json({result})
    })
    .catch(err => {
        res.status(404).json({err})
    })
})

// Delete an order
router.delete('/:orderId', (req, res) => {
    Order.deleteOne({_id: req.params.orderId})
    .then(result => {
        let message
        if (result.deletedCount !== 0) {
            message = 'Order removed successfully'
        }else {
            message = 'Order not found'
        }
        res.status(201).json({
            message
        })
    })
    .catch(err => {
        res.status(404).json({err})
    })
})

module.exports = router