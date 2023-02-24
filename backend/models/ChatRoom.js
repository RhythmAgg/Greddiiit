const mongoose = require('mongoose')

const chatroomSchema = new mongoose.Schema({
    members: [{
        type: String
    }],
    messages: [{
        sender: {
            type: String
        },
        text: {
            type: String
        },
        creation_time: {
            type: Date
        }
    }]
},{
    timestamps: true
})

module.exports = mongoose.model('ChatRoom', chatroomSchema)