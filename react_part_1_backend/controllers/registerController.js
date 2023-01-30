const User = require('../models/User')
const bcrypt = require('bcrypt')
const Followers_Following = require('../models/FollowersFollowing')



// @desc Create new user
// @route POST /register
// @access Private
const registerNewUser = async (req, res) => {
    const { firstName,lastName,userName,email,age,contact,password } = req.body   

    // Check for duplicate username
    const duplicate = await User.findOne({ userName }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = {firstName,lastName,userName,email,age,"contact": contact.toString(),"password": hashedPwd,'savedposts': []}

    // Create and store new user 
    const user = await User.create(userObject)
    const fol = await Followers_Following.create({'user': user._id,'followers': [{'name': userName,'name_id': user._id}],'following': [{'name': userName,'name_id': user._id}]})

    if (user) { //created 
        res.status(201).json({ message: `New user ${userName} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
}

module.exports = {
    registerNewUser
}