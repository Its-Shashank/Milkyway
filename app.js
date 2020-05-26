require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 9000
const bodyParser = require('body-parser')
const cors = require('cors')

// Routes
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
app.use(cors())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  

// Routes

// app.use('/product', productRoutes)
app.use('/orders', orderRoutes)
app.use('/customer', customerRoutes)

app.listen(port, () => console.log(`Server is up and running on port ${port}`))
