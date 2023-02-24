const express = require('express')
const router = express.Router()
const allSubGreddiiitController = require('../controllers/allSubGreddiiitController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .get(allSubGreddiiitController.getAllSubGreddiiits)

router.route('/joinRequest')
    .patch(allSubGreddiiitController.joinRequest)

router.route('/leaveSub')
    .patch(allSubGreddiiitController.leaveSub)

router.route('/subPosts')
    .post(allSubGreddiiitController.subPosts)

router.route('/createPost')
    .post(allSubGreddiiitController.createPost)

router.route('/newvisitor')
    .post(allSubGreddiiitController.newvisitor)


module.exports = router
