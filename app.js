require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000


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

// Routes


app.listen(port, () => console.log(`Server is up and running on port ${port}`))
