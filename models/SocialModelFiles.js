const mongoose = require('mongoose');

const Schema = mongoose.Schema
const fileSchema = new Schema({
    file: { type: Buffer },
}, { timestamp: true })

const SocialModelFiles = mongoose.model('socialFileStorage', fileSchema)
module.exports = SocialModelFiles