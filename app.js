require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

// Routes
const productRoutes = require('./routes/milkProduct')
const orderRoutes = require('./routes/milkOrder')
const customerRoutes = require('./routes/customer')


mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => {
    console.log('DB connected')
})
.catch(err => console.log(err))

app.use(bodyParser.json())

// Routes

app.use('/product', productRoutes)
app.use('/orders', orderRoutes)
app.use('/customer', customerRoutes)

app.listen(port, () => console.log(`Server is up and running on port ${port}`))
