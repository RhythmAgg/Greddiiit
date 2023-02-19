const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(userController.getUserInfo)
    .patch(userController.editUserInfo)

router.route('/savedposts')
    .get(userController.savedposts)

router.route('/friends')
    .get(userController.getFriends)
module.exports = router
