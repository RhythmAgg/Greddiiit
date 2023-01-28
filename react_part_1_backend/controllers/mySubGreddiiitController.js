const User = require('../models/User')
const SubGreddiiits = require('../models/SubGreddiiits')
const bcrypt = require('bcrypt')
const Followers_Following = require('../models/FollowersFollowing')



// @desc Create new user
// @route POST /
// @access Private
const createSubGreddiiit = async (req, res) => {
    const {nameSub,descSub,tagsSub,bannedSub} = req.body

    const duplicate = await SubGreddiiits.findOne({'name': nameSub }).lean().exec()

    if (duplicate) {
        console.log('taken')
        return res.status(409).json({ message: 'Duplicate username' })
    }

    const subObject = {
        'moderator': req.userName,
        'name': nameSub,
        'description': descSub,
        'tags': tagsSub.split(',').filter(item => item !== ''),
        'bannedWords': bannedSub.split(',').filter(item => item !== ''),
        'followers': [{'name': req.userName,'name_id': req.user_id}],
        'requests': [],
        'posts': []
    }

    

    const sub = await SubGreddiiits.create(subObject)
    console.log(sub)

    if (sub) { //created 
        res.status(201).json(sub)
    } else {
        res.status(400).json({ message: 'Invalid sub details received' })
    }
}

const getSubGreddiiits = async (req,res) => {
    const logged_id = req.userName

    const result = await SubGreddiiits.find({'moderator': logged_id}).lean().exec()
    
    // console.log(result)
    
    res.json({result,'logged_in': req.userName})
}

const deleteSubGreddiiit = async (req,res) => {
    const logged_id = req.user_id

    const result = await SubGreddiiits.deleteOne({'name': req.body.delete_subGreddiiit}).lean().exec()

    console.log(result)

    res.json({result,'logged_in': req.userName})
}
module.exports = {
    createSubGreddiiit,
    getSubGreddiiits,
    deleteSubGreddiiit
}