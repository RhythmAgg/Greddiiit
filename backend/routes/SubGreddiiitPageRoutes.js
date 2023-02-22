const express = require('express')
const router = express.Router()
const SubGreddiiitPageController = require('../controllers/SubGreddiiitPageController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/report')
    .post(SubGreddiiitPageController.report)

router.route('/addComment')
    .post(SubGreddiiitPageController.addComment)

router.route('/addReply')
    .post(SubGreddiiitPageController.addReply)

router.route('/upvote')
    .patch(SubGreddiiitPageController.upvote)

router.route('/downvote')
    .patch(SubGreddiiitPageController.downvote)

router.route('/savepost')
    .patch(SubGreddiiitPageController.savepost)

router.route('/unsavepost')
    .patch(SubGreddiiitPageController.unsavepost)



module.exports = router
