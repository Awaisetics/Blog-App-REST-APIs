const mongoose = require('mongoose');
const comment = require('../model/CommentSchema')
const BlogSchema = mongoose.Schema({
    title: String,
    content: String,
    authorDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    tags : [],
    comments: [comment],
    postedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('blogs', BlogSchema);