
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
var gridfs = require('gridfs-stream');
var fs = require('fs');
const bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
require('dotenv').config()
const UserRoute = require('./routes/UserRoute');
const UserAuthRoute = require('./routes/UserAuthRoute')
const SurveyRoute =  require('./routes/SurveyRoute');
const SocialRoute = require('./routes/SocialRoute')
const mongoDbconnect = require('./mongoDbConnect');
const AuthController = require('./controllers/AuthController');
mongoose.connect(mongoDbconnect.mongoDbConnectString, { useNewUrlParser: true, useUnifiedTopology: true });

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
app.use(cors());
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server is running on PORT  ${PORT}`)
})

app.use('/api/user', UserRoute)
app.use('/api/auth', UserAuthRoute)
app.use('/api/survey', SurveyRoute)
app.use('/api/social', SocialRoute)
