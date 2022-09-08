const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    comment: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 300,
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = CommentSchema;