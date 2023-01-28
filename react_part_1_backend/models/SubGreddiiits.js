const mongoose = require('mongoose')

const subgreddiiitsSchema = new mongoose.Schema({
    moderator: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    tags: [{
        type: String,
    }],
    bannedWords: [{
        type: String
    }],
    followers: [{
        name: {
            type: String
        },
        name_id: {
            type: String
        },
        status: {
            type: String
        }
    }],
    leftBefore: [{
        type: String
    }],
    requests: [{
        type: String
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
},{
    timestamps: true
})

module.exports = mongoose.model('SubGreddiiits', subgreddiiitsSchema)