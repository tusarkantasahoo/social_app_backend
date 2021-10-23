const mongoose = require('mongoose');

const Schema = mongoose.Schema
const surveySchema = new Schema({
    title: { type: String },
    question:{type: String},
    quizQuestion:{type: Array},
    researchQuestion:{type: Array},
    surveyType: { type: String },
    options:{ type:Array },
    duration:{type:String},
    comments:{type:Array},
    user: { type: Object },
    answer:{type: String},
    userResponses:{ type:Array },
    createdAt:{type:Date},
}, { timestamp: true })

const Survey = mongoose.model('surveyList', surveySchema)
module.exports = Survey