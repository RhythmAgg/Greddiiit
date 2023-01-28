const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content: {
        type: String
    },
    posted_by: {
        type: String,
        required: true,
    },
    posted_in: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        required: true
    },
    downvotes: {
        type: Number,
        required: true
    },
    comments: [{
        content: {
            type: String
        },
        commentor: {
            type: String
        }
    }]
},{
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)