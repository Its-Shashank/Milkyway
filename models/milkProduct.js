const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    _id: {
        type: Number
    },
    name: {
        type: String,
        default: 'Full cream',
        trim: true
    }
})

module.exports = mongoose.model('Milk', productSchema)