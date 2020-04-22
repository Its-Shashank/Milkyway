const Milk = require('../models/milkProduct')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')


// We have only two types of milk hence ids are static
// Creating a new milk product 

router.post('/', (req, res) => {
    let id
    if (req.body.name === 'Full cream'){
        id = 1
    }
    if (req.body.name === 'Toned') {
        id = 2
    }
    const product = new Milk({
        _id: id,
        name: req.body.name
    })
    product.save()
    .then(result => {
        res.status(201).json({
            message: 'Product successfully saved',
            result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({err})
    })
})

// Getting all the products.

router.get('/', (req, res) => {
    Milk.find()
    .select('name _id')
    .then(result => {
        res.status(201).json({result})
    })
    .catch(err => console.log(err))
})

// Delete route

router.delete('/', (req, res) => {
    Milk.deleteOne({name: req.body.name})
    .exec()
    .then(result => {
        res.status(201).json({
            message: 'Milk type deleted successfully'
        })
    })
    .catch(err => {
        res.status(404).json({err})
    })
})

module.exports = router