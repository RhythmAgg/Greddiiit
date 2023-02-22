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

    let comment = (req.body.content).split(' ')

    console.log(comment)

    const bannedWords = (req.body.subdetails).bannedWords

    console.log(bannedWords)

    for(let i=0;i<(bannedWords.length);i++)
    {
        for(let k=0;k<comment.length;k++){
            var ele = (comment[k]).split(',')
            for(let j=0;j<ele.length;j++)
            {
                if(ele[j].toLowerCase() === bannedWords[i].toLowerCase()) ele[j] = '*'
            }
            comment[k] = ele.join(',')
            console.log(comment[k])
        }
    }

    const final_content = comment.join(' ')

    const result = await Post.create({posted_in,'content': final_content,'posted_by':logged_in,'upvotes': [],
                    'downvotes': [],'comments': [],'modStatus': 'unblocked'
                })

    const rs = await SubGreddiiits.findOneAndUpdate({'name': posted_in},{$push: {posts: result._id}}
                ,{new: true}).lean().exec()
    
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    console.log(currentDate); // "17-6-2022"

    const analytics = await SubGreddiiits.findOne({'name': posted_in,'analytics': {$elemMatch:  {date: currentDate}}}).lean().exec()

    console.log(analytics)
    if(!analytics){
        const create_analytics = await SubGreddiiits.findOneAndUpdate({'name': posted_in},
                                {$push: {analytics: {date: currentDate,newmembers: [],newposts: [result._id],visitors: 0}}},{new: true}).lean().exec()
        
        console.log(create_analytics)
    }
    else{
        const update_analytics = await SubGreddiiits.findOneAndUpdate({'name': posted_in,'analytics': {$elemMatch:  {date: currentDate}}},
                                {$push: {'analytics.$.newposts': result._id}},{new:true}).lean().exec()
        console.log('to update')
        console.log(update_analytics)
    }
    
    console.log(result)
    res.json({result,logged_in})
}

const newvisitor = async (req,res) => {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;

    const analytics = await SubGreddiiits.findOne({'name': req.body.sub,'analytics': {$elemMatch:  {date: currentDate}}}).lean().exec()

    console.log(analytics)
    if(!analytics){
        const create_analytics = await SubGreddiiits.findOneAndUpdate({'name': req.body.sub},
                                {$push: {analytics: {date: currentDate,newmembers: [],newposts: [],visitors: 1}}},{new: true}).lean().exec()
        
        console.log(create_analytics)
    }
    else{
        const update_analytics = await SubGreddiiits.findOneAndUpdate({'name': req.body.sub,'analytics': {$elemMatch:  {date: currentDate}}},
                                {$inc: {'analytics.$.visitors': 1}},{new:true}).lean().exec()
        console.log('to update')
        console.log(update_analytics)
    }

    res.json({'message': 'ok'})

}

module.exports = {
    getAllSubGreddiiits,
    joinRequest,
    leaveSub,
    subPosts,
    createPost,
    newvisitor
}