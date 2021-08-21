const mongoose = require('mongoose');

const Schema = mongoose.Schema
const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    dob: { type: String },
    password: { type: String },
    userImage:{ type: String},
    userAddedFrom:{ type: String},
}, { timestamp: true })

const User = mongoose.model('UserFullData', userSchema)
module.exports = User