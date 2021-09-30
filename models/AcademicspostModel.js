const mongoose = require('mongoose');

const Schema = mongoose.Schema
const academicspostSchema = new Schema({
    image:{type : String},
    comment: { type: Array },
    addedBy: { type: String },
   collegename:{type:String},
   description:{type:String},
   collegeId:{type:String},
   title:{type:String}

    
}, { timestamp: true })

const Academicspost = mongoose.model('academicspost', academicspostSchema)
module.exports = Academicspost