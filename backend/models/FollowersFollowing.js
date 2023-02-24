const mongoose = require('mongoose')

const follSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    followers: [{
        name: {
            type: String
        },
        name_id: {
            type: String
        }
    }],
    following: [{
        name: {
            type: String
        },
        name_id: {
            type: String
        }
    }]
},{
    timestamps: true
})

module.exports = mongoose.model('Followers_Following', follSchema)