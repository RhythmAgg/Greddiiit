const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



// @desc Authenticate new user
// @route POST /auth
// @access Private
const authUser = async (req, res) => {
    const { userName,password } = req.body   

    // Check for duplicate username
    const user_exists = await User.findOne({ userName }).lean().exec()

    if (!user_exists) {
        return res.status(409).json({ message: 'Not registered' })
    }

    const match = await bcrypt.compare(password, user_exists.password)

    if (!match) return res.status(401).json({ message: 'Password Incorrect' })

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "userName": user_exists.userName,
                "user_id": user_exists._id
            }
        },
        process.env.ACCESS_TOKEN_SECRET
    )
    res.json({accessToken})
}

module.exports = {
    authUser
}