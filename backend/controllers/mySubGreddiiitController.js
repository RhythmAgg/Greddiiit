const User = require('../models/User')
const SubGreddiiits = require('../models/SubGreddiiits')
const bcrypt = require('bcrypt')
const Followers_Following = require('../models/FollowersFollowing')
const Report = require('../models/Report')
const Post = require('../models/Post')

var nodemailer = require('nodemailer')



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
        'followers': [{'name': req.userName,'name_id': req.user_id,'status': 'unblocked'}],
        'requests': [],
        'blocked': [],
        'posts': [],
        'analytics': []
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

    const result = await SubGreddiiits.findOneAndDelete({'name': req.body.delete_subGreddiiit}).lean().exec()

    const sub_posts = await Promise.all((result.posts).map(async (element) =>  {
        const temp = await Post.findOneAndDelete({'_id':element}).lean().exec()
        return temp;
    }))

    console.log(result)

    res.json({result,'logged_in': req.userName})
}

const acceptRequest = async (req,res) => {
    const logged_id = req.user_id

    const result = await SubGreddiiits.findOneAndUpdate({'name': req.body.sub},
                    {$pull: {requests: req.body.requesting}},{new:true})
                    .lean().exec()

    const result_ = await SubGreddiiits.findOneAndUpdate({'name': req.body.sub}, 
                    {$push: {followers: {name: req.body.requesting,name_id: req.body.requesting_id,status: 'unblocked'}}},{new:true})
                    .lean().exec()

    console.log(result)

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
                                {$push: {analytics: {date: currentDate,newmembers: [req.body.requesting],newposts: [],visitors: 0}}},{new: true}).lean().exec()
        
        console.log(create_analytics)
    }
    else{
        const update_analytics = await SubGreddiiits.findOneAndUpdate({'name': req.body.sub,'analytics': {$elemMatch:  {date: currentDate}}},
                                {$push: {'analytics.$.newmembers': req.body.requesting}},{new:true}).lean().exec()
        console.log('to update')
        console.log(update_analytics)
    }

    res.json({result,'logged_in': req.userName})
}
const rejectRequest = async (req,res) => {
    const logged_id = req.user_id

    const result = await SubGreddiiits.findOneAndUpdate({'name': req.body.sub},
                    {$pull: {requests: req.body.requesting}},{new:true})
                    .lean().exec()


    console.log(result)

    res.json({result,'logged_in': req.userName})
}
const getReports = async (req,res) => {
    const logged_in = req.userName
    const sub = req.query.sub
    console.log(logged_in,sub)

    const reports = await Report.find({'reported_sub': sub}).lean().exec()

    console.log(reports)
    res.json({reports})

}
const deleteReport = async (req,res) => {
    console.log('uess')
    const logged_id = req.user_id

    const result = await Report.deleteOne({'_id': req.body.delete_report_id}).lean().exec()

    const user = await User.findOne({'userName': req.body.reported_by}).lean().exec()

    console.log(result)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gokum1037@gmail.com',
          pass: 'hijrjjmoyesaknrt'
        }
      });
      
      var mailOptions = {
        from: 'gokum1037@gmail.com',
        to: user.email,
        subject: 'Report Ignored',
        text: `report with id: ${req.body.delete_report_id} ignored`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    res.json({result,'logged_in': req.userName})
    
}
const deleteReportPost = async (req,res) => {
    console.log('delete report and post')
    const logged_id = req.user_id

    const result = await Report.deleteOne({'_id': req.body.delete_report_id}).lean().exec()
    const result_ = await Post.deleteOne({'_id': req.body.delete_post_id}).lean().exec()
    const result__ = await SubGreddiiits.findOneAndUpdate({'name': req.body.sub_posted_in},
    {$pull : {posts: req.body.delete_post_id}}).lean().exec()
    const result___ = await SubGreddiiits.findOneAndUpdate({'name': req.body.sub_posted_in},
    {$inc : {deletedpost_count: 1}},{new:true,upsert:true}).lean().exec()

    const user = await User.findOne({'userName': req.body.reported_by}).lean().exec()
    const user1 = await User.findOne({'userName': req.body.reported_user}).lean().exec()

    console.log(result)

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gokum1037@gmail.com',
          pass: 'hijrjjmoyesaknrt'
        }
      });
      
      var mailOptions = {
        from: 'gokum1037@gmail.com',
        to: `${user.email},${user1.email}`,
        subject: 'Report - Post deleted',
        text: `report with id: ${req.body.delete_report_id} post deleted`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

    res.json({result,'logged_in': req.userName})   
}
const blockUser = async (req,res) => {
    const logged_id = req.user_id

    const result = await SubGreddiiits.findOneAndUpdate({'name': req.body.sub},
                {$pull : {followers: {name: req.body.blockUser}}},{new: true}).lean().exec()

    const resul = await SubGreddiiits.findOneAndUpdate({'name': req.body.sub},
                {$push : {blocked: req.body.blockUser}},{new: true,upsert:true}).lean().exec()

    const result_ = await Report.deleteOne({'_id': req.body.delete_report_id}).lean().exec()


    console.log(result)

    res.json({result,'logged_in': req.userName})
    
}
module.exports = {
    createSubGreddiiit,
    getSubGreddiiits,
    deleteSubGreddiiit,
    acceptRequest,
    rejectRequest,
    getReports,
    deleteReport,
    deleteReportPost,
    blockUser
}