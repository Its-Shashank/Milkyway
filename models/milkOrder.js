const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    milkType: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true
    },
    deliveryTime: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Order', orderSchema)