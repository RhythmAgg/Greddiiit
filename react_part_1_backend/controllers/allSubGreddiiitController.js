const User = require('../models/User')
const SubGreddiiits = require('../models/SubGreddiiits')
const Post = require('../models/Post')

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

const subPosts = async (req,res) => {

    const subname = req.body.subname

    const logged_in = req.userName

    const result = await SubGreddiiits.findOne({'name': subname}).lean().exec()


    const sub_posts = await Promise.all((result.posts).map(async (element) =>  {
        const temp = await Post.findById(element).lean().exec()
        return temp;
    }))
    
    console.log(sub_posts)
    
    res.json({result,sub_posts,logged_in})
}

const createPost = async (req,res) => {

    console.log('first post')

    const logged_in = req.userName

    const posted_in = req.body.posted_in

    const content = req.body.content

    const result = await Post.create({posted_in,content,'posted_by':logged_in,'upvotes': [],
                    'downvotes': [],'comments': []
                })

    const rs = await SubGreddiiits.findOneAndUpdate({'name': posted_in},{$push: {posts: result._id}}
                ,{new: true}).lean().exec()
            
    
    console.log(result)
    res.json({result,logged_in})
}


module.exports = {
    getAllSubGreddiiits,
    joinRequest,
    leaveSub,
    subPosts,
    createPost
}