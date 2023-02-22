const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    concern: {
        type: String
    },
    reported_by: {
        type: String,
        required: true,
    },
    reported_sub: {
        type: String,
        required: true,
    },
    reported_user: {
        type: String
    },
    reported_post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    reportText: {
        type: String,
    },
    expiresAt: {
        type: Date,
        default: Date.now,
        expires: 864000
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Report', reportSchema)