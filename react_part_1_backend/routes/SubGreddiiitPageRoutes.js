const express = require('express')
const router = express.Router()
const SubGreddiiitPageController = require('../controllers/SubGreddiiitPageController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/addComment')
    .post(SubGreddiiitPageController.addComment)

router.route('/upvote')
    .patch(SubGreddiiitPageController.upvote)

router.route('/downvote')
    .patch(SubGreddiiitPageController.downvote)

router.route('/savepost')
    .patch(SubGreddiiitPageController.savepost)

module.exports = router
