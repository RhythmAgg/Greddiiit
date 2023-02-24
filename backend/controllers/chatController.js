const User = require('../models/User')
const Post = require('../models/Post')
const Followers_Following = require('../models/FollowersFollowing')
const ChatRoom = require('../models/ChatRoom')

const bcrypt = require('bcrypt')


// @desc Get User Info
// @route GET /user
// @access Private
const getChatRoom = async (req, res) => {

    const userName= req.userName

    const friend = req.body.friend

    // console.log(userName);

    const chatroom = await ChatRoom.find({'members': {$all : [userName,friend]}}).lean().exec();

    console.log(chatroom);
    const res_obj = {chatroom}
    res.json(res_obj);

    // res.status(201).json({"userName": "ok"});
}
const sendMessage = async (req, res) => {

    const userName= req.userName

    const text = req.body.text
    const chat_id = req.body.chat_id

    // console.log(userName);

    const date = new Date()
    const message = await ChatRoom.findOneAndUpdate({'_id':chat_id},
    {$push: {messages: {'text': text,'sender': userName,'creation_time': date}}},{new:true}).lean().exec();

    console.log(message);
    const res_obj = {message}
    res.json(res_obj);

    // res.status(201).json({"userName": "ok"});
}
const createChatRoom = async (req, res) => {

    const userName= req.userName

    const friend = req.body.friend

    // console.log(userName);
    members = [userName,friend]

    const obj = {
        members: members,
        messages: []
    }

    const chatroom = await ChatRoom.create(obj)

    console.log(chatroom);
    const res_obj = {chatroom}
    res.json(res_obj);

    // res.status(201).json({"userName": "ok"});
}

module.exports = {
    getChatRoom,
    createChatRoom,
    sendMessage
}