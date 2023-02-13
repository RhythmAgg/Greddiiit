const express = require('express')
const router = express.Router()
const mySubGreddiiitController = require('../controllers/mySubGreddiiitController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .post(mySubGreddiiitController.createSubGreddiiit)
    .get(mySubGreddiiitController.getSubGreddiiits)
    .delete(mySubGreddiiitController.deleteSubGreddiiit)

router.route('/accept')
    .patch(mySubGreddiiitController.acceptRequest)

router.route('/reject')
    .patch(mySubGreddiiitController.rejectRequest)

router.route('/getReports')
    .get(mySubGreddiiitController.getReports)

router.route('/deleteReport')
    .delete(mySubGreddiiitController.deleteReport)

router.route('/deleteReportPost')
    .delete(mySubGreddiiitController.deleteReportPost)

router.route('/blockUser')
    .delete(mySubGreddiiitController.blockUser)


module.exports = router
