const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const UserRoute = require('./routes/UserRoute');
const UserAuthRoute = require('./routes/UserAuthRoute')

mongoose.connect('mongodb+srv://tusar:tusar123@cluster0.bmnjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { userNewUrlParser: true, useUndefinedTopology: true });

const db = mongoose.connection

db.on('error', err => {
    console.log(err)
})

db.once('open', () => {
    console.log("Database connection established!!")
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on PORT  ${PORT}`)
})

app.use('/api/user', UserRoute)
app.use('/api/auth', UserAuthRoute)