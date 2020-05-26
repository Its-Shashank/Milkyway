const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const auth = require('../middlewares/check-auth')
// order model
const Order = require('../models/milkOrder')

// Create a new order
router.post('/', auth, (req, res) => {
    Order
    .countDocuments()
    .then(orderCount => {
        if (orderCount <= 1) {
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                milkType: req.body.milkType,
                quantity: req.body.quantity,
                deliveryTime: req.body.deliveryTime,
                plan: req.body.plan,
                address: req.body.address,
                contact: req.body.contact
            })
            order.save()
            .then(result => {
                res.status(201).json({
                    message: 'Order placed successfully',
                    result
                })
            })
            .catch(err => {
                res.status(500).json({err})
            })
        }
        else {
            res.status(400).json({message: "Can't add more than one order from an account"})
        }
    })
    .catch(e => console.log(e))
})

// Get all orders

router.get('/all', auth, (req, res) => {
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
router.delete('/:orderId', auth, (req, res) => {
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