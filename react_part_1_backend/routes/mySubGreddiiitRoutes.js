const express = require('express')
const router = express.Router()
const mySubGreddiiitController = require('../controllers/mySubGreddiiitController')
const verifyJWT = require('../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/')
    .post(mySubGreddiiitController.createSubGreddiiit)
    .get(mySubGreddiiitController.getSubGreddiiits)
    .delete(mySubGreddiiitController.deleteSubGreddiiit)

module.exports = router
