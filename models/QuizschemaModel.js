const mongoose = require('mongoose');

const Schema = mongoose.Schema
const quizSchema = new Schema({
    title: { type: String },
    question:{type: Array},
    surveyType: { type: String },
    duration:{type:String},
    user: { type: Object },
    createdAt:{type:Date},
}, { timestamp: true })



const Quizschema = mongoose.model('Quizschema', quizSchema)
module.exports = Quizschema