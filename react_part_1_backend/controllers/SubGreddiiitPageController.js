const User = require('../models/User')
const SubGreddiiits = require('../models/SubGreddiiits')
const Post = require('../models/Post')

const bcrypt = require('bcrypt')
const Followers_Following = require('../models/FollowersFollowing')



// @desc Create new user
// @route POST /
// @access Private



const addComment = async (req,res) => {
    const logged_in = req.userName

    const post_id = req.body.post_id

    const result = await Post.findOneAndUpdate({'_id': post_id},
                    {$push : {comments: {content: req.body.content,commentor: logged_in}}},{new: true}).lean().exec()
    
    console.log(result)
    
    res.json(result)

}

const savepost = async (req,res) => {
    const logged_id = req.user_id

    const post_id = req.body.post_id

    const result = await User.findOneAndUpdate({'_id': logged_id},
                    {$push: {'savedposts': post_id}},{new:true}).lean().exec()

    res.json(result)
}

const upvote = async (req,res) => {

    const post_id = req.body.post_id

    const username = req.userName

    const result = await Post.findOneAndUpdate({'_id': post_id},
                    {$push : {'upvotes': username}},{new: true}).lean().exec()
    
    const result_2 = await Post.findOneAndUpdate({'_id': post_id},
                    {$pull : {'downvotes': username}},{new: true}).lean().exec()

    res.json(result)

}

const downvote = async (req,res) => {

    const post_id = req.body.post_id

    const username = req.userName

    const result = await Post.findOneAndUpdate({'_id': post_id},
                    {$push : {'downvotes': username}},{new: true}).lean().exec()
    
    const result_2 = await Post.findOneAndUpdate({'_id': post_id},
                    {$pull : {'upvotes': username}},{new: true}).lean().exec()

    res.json(result)

}



module.exports = {
    addComment,
    downvote,
    upvote,
    savepost
}