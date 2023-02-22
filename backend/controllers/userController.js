const User = require('../models/User')
const Post = require('../models/Post')
const Followers_Following = require('../models/FollowersFollowing')

const bcrypt = require('bcrypt')


// @desc Get User Info
// @route GET /user
// @access Private
const getUserInfo = async (req, res) => {

    const userName= req.userName.toString();

    // console.log(userName);

    const user = await User.find().select('-password').lean();
    console.log(user);
    const res_obj = {user,'logged_in': req.userName}
    res.json(res_obj);

    // res.status(201).json({"userName": "ok"});
}

const getFriends = async (req, res) => {

    const user_id= req.user_id;
    const userName = req.userName

    // console.log(userName);

    const user = await Followers_Following.findOne({'user': user_id}).lean().exec();
    console.log(user);
    const friend = user.followers.filter(follower => {
        return user.following.some(x => x.name === follower.name) && follower.name !== req.userName
    })
    console.log(friend)
    const res_obj = {friend,'logged_in': req.userName}
    res.json(res_obj);

    // res.status(201).json({"userName": "ok"});
}



const savedposts = async (req,res) => {
    const userName = req.userName

    const user = await User.findOne({'userName':userName}).lean().exec()

    console.log(user)
    const sub_posts = await Promise.all((user.savedposts).map(async (element) =>  {
        const temp = await Post.findById(element).lean().exec()
        return temp;
    }))

    const res_obj = {user,sub_posts,'logged_in': userName}
    res.json(res_obj)

}

const editUserInfo = async (req, res) => {

    const id = req.user_id;

    const fie = req.body.field_edit.toString()

    console.log(fie)

    if(fie == 'firstName')
    {
        const user = await User.findOneAndUpdate({'userName': req.userName},{firstName: req.body.value.toString()},{new: true}).lean().exec()
        console.log(user);
        res.json(user)
    }
    else if(fie == 'lastName')
    {
        const user = await User.findOneAndUpdate({'_id': id},{lastName: req.body.value.toString()},{new: true})
        console.log(user);
        res.json(user)

    }
    else if(fie == 'age')
    {
        const user = await User.findOneAndUpdate({'_id': id},{age: Number(req.body.value)},{new: true} )
        console.log(user);
        res.json(user)
    }
    else if(fie == 'contact')
    {
        const user = await User.findOneAndUpdate({'_id': id},{contact: req.body.value.toString()},{new: true})
        console.log(user);
        res.json(user)
    }
    else if(fie == 'email')
    {
        const user = await User.findOneAndUpdate({'_id': id},{email: req.body.value.toString()},{new: true})
        console.log(user);
        res.json(user)
    }
    
    res.status(401).json({"userName": "field is not in the schema"});
}

module.exports = {
    getUserInfo,
    getFriends,
    editUserInfo,
    savedposts
}