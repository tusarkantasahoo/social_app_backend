const mongoose = require('mongoose');

const Schema = mongoose.Schema
const academicsSchema = new Schema({
    academicType:{type : String},
    name: { type: String },
    address:{type: String},
    description: { type: String },
    state: { type: String },
    city: { type: String },
    affiliation: { type: String },
    pinCode: { type: String },
    collegeType: { type: String},
    contact: { type: String },
    website: { type: String },
    email: { type: String },
    courseAndFees: { type: String },
    cutoff: { type: String },
    admission: { type: String },
    examAccepted: { type: String },
    facilities: { type: String },
    placement:{ type: String},
    reviewAndRating: { type: String },
    ranking: { type: String },
    comparison: { type: String },
}, { timestamp: true })

const Academics = mongoose.model('academics', academicsSchema)
module.exports = Academics