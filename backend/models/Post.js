const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    content: {
        type: String
    },
    posted_by: {
        type: String,
        required: true,
    },
    modStatus: {
        type: String,
        required: true
    },
    posted_in: {
        type: String,
        required: true,
    },
    upvotes: [{
        type: String,
    }],
    downvotes: [{
        type: String,
    }],
    comments: [{
        content: {
            type: String
        },
        commentor: {
            type: String
        },
        parent: {
            type: mongoose.Schema.Types.ObjectId,
        },
        childcomments: [{
            type: mongoose.Schema.Types.ObjectId
        }]
    }]
},{
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)