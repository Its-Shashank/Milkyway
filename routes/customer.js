const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middlewares/check-auth')
// Customer model
const Customer = require('../models/customer')
//https://xhamster2.desi/videos/homemade-horny-and-hot-amateur-lesbian-sex-at-home-12875156

// Create a customer
router.post('/signup', (req, res) => {
    Customer.find({email: req.body.email})
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({message: 'Mail exists'})
        }
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(409).json({err})
            }
            const customer = new Customer({
                _id: mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
                phone: req.body.phone,
                address: req.body.address
            })
            customer.save()
            .then(result => {
                res.status(201).json({
                    message: 'User created',
                    result
                })
            })
            .catch(err => {
                res.status(500).json({err})
            })
        })
    })
    
})

// Login
router.post('/login', (req, res) => {
    Customer.find({email: req.body.email})
    .exec()
    .then(customer => {
        if (customer.length < 1) {
            return res.status(201).json({
                message: 'Auth failed'
            })
        }
        
        bcrypt.compare(req.body.password, customer[0].password, (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: 'Auth failed'
                })
            }
            if (result) {
                const token = jwt.sign({
                    email: customer[0].email,
                    customerId: customer[0]._id
                },
                process.env.SECRET,
                {
                    expiresIn: '1h'
                })
                return res.status(201).json({
                    message: 'You are logged in',
                    token
                })
            }
            console.log(token)
            res.status(401).json({
                message:'Auth failed'
            })
        })
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

// Find all customers
router.get('/', (req, res) => {
    Customer.find()
    .select('_id email password phone address')
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(404).json(err)
    })
})

// Get customer details
router.get('/:customerId', auth, (req, res) => {
    Customer.findById({_id: req.params.customerId})
    .select('_id email password phone address')
    .then(result => {
        res.status(201).json({result})
    })
    .catch(err => {
        res.status(404).json({err})
    })
})

// Updating customer details
router.patch('/:customerId', auth, (req, res) => {
    const updatedArray = {}
    for (let i of req.body) {
        updatedArray[i.options] = i.value
    }
    Customer.updateOne({_id: req.params.customerId}, {$set: updatedArray})
    .then(result => {
        let message
        if (result.nModified > 0){
            message = `You updated ${req.body[0].options}`
        }if (result.nModified === 0) {
            message = 'Unable to update'
        }
        res.status(201).json({message})
    })
    .catch(err => {
        res.status(400).json({err})
    })
})

// Delete a customer
router.delete('/:customerId', auth, (req, res) => {
    Customer.deleteOne({_id: req.params.customerId})
    .then(result => {
        let message
        if (result.deletedCount > 0){
            message = 'Customer account deleted'
        }else {
            message = 'Unable to delete'
        }
        res.status(200).json({message})
    })
    .catch(err => {
        res.status(404).json({err})
    })
})

module.exports = router