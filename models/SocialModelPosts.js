const mongoose = require('mongoose');

const Schema = mongoose.Schema
const socialSchema = new Schema({
    title: { type: String },
    description:{type: String},
    postType: { type: String },
    likes:{ type:Number },
    dislikes:{ type:Number },
    comments:{type:Array},
    user: { type: Object },
    userResponses:{ type:Array },
    fileStorageId:{type:String},
    videoLink:{ type: String },
}, { timestamp: true })

const SocialModelPosts = mongoose.model('socialPosts', socialSchema)
module.exports = SocialModelPosts