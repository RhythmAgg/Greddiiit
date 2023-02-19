const express = require('express')
const router = express.Router()
const chatController = require('../controllers/chatController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/getChatRoom')
    .post(chatController.getChatRoom)

router.route('/createChatRoom')
    .post(chatController.createChatRoom)

router.route('/sendMessage')
    .post(chatController.sendMessage)
module.exports = router
