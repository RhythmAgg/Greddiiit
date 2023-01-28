const User = require('../models/User')
const SubGreddiiits = require('../models/SubGreddiiits')
const bcrypt = require('bcrypt')
const Followers_Following = require('../models/FollowersFollowing')



// @desc Create new user
// @route POST /
// @access Private

const getAllSubGreddiiits = async (req,res) => {
    const logged_id = req.user_id

    const result = await SubGreddiiits.find().sort({createdAt: -1}).lean().exec()
    
    // console.log(result)
    
    res.json({result,'logged_in': req.userName})
}

const joinRequest = async (req,res) => {
    const logged_in = req.userName

    const result = await SubGreddiiits.findOneAndUpdate({'name': req.body.name_sub},
                    {$push : {requests: logged_in}},{new: true}).lean().exec()
    
    console.log(result)
    
    res.json(result)
}

const leaveSub = async (req,res) => {
    const logged_in = req.userName

    const result_1 = await SubGreddiiits.findOneAndUpdate({'name': req.body.name_sub},
                    {$pull : {followers: {name: logged_in}}},{new: true}).lean().exec()
    
    const result = await SubGreddiiits.findOneAndUpdate({'name': req.body.name_sub},
                    {$push : {leftBefore: logged_in}},{new: true}).lean().exec()

    console.log(result)
    
    res.json(result)
}


module.exports = {
    getAllSubGreddiiits,
    joinRequest,
    leaveSub
}