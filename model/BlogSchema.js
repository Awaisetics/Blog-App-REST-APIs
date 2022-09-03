const mongoose = require('mongoose');
const commentss = require('../model/CommentSchema')
const BlogSchema = mongoose.Schema({
    title: String,
    content: String,
    authorDetail: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    comments: [commentss],
    postedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('bolgs', BlogSchema);