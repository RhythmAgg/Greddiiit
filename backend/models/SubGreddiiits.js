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
    blocked: [{
        type: String
    }],
    requests: [{
        type: String
    }],
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
    analytics: [{
        date: {
            type: String
        },
        newmembers: [{
            type: String
        }],
        newposts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],
        visitors: {
            type: Number
        }
    }],
    report_count:{
        type: Number
    },
    deletedpost_count:{
        type: Number
    }
},{
    timestamps: true
})

module.exports = mongoose.model('SubGreddiiits', subgreddiiitsSchema)