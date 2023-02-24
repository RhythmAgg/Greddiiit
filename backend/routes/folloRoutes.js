const express = require('express')
const router = express.Router()
const followersController = require('../controllers/followersController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(followersController.getFollowers)

router.route('/updateFollower')
    .patch(followersController.updateFollowers)

router.route('/updateFollowing')
    .patch(followersController.updateFollowing)

router.route('/addFollower')
    .patch(followersController.addFollower)

module.exports = router
