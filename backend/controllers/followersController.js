const User = require('../models/User')
const Followers_Following = require('../models/FollowersFollowing')
const bcrypt = require('bcrypt');
const expressAsyncHandler = require('express-async-handler');


// @desc Get followers
// @route GET /follo
// @access Private
const getFollowers = async (req, res) => {

    const id = req.user_id;
    const result = await Followers_Following.findOne({user: id}).lean()
    console.log(JSON.stringify(result));
    res.json(result)

    // res.status(201).json({"userName": "ok"});
}
const updateFollowers = async (req, res) => {

    const id_loggedIn = req.user_id;
    console.log(req.body.user_to_delete);
    const result = await Followers_Following.findOneAndUpdate({"user": id_loggedIn},{$pull: {followers: {name: req.body.user_to_delete.toString()}}},{new: true}).lean().exec()
    const alsothis = await Followers_Following.findOneAndUpdate({"user": req.body.delete_id},{$pull: {following: {name: req.userName.toString()}}},{new: true}).lean().exec()

    console.log(result);
    res.json(result)

    // res.status(201).json({"userName": "ok"});
}
const updateFollowing = async (req, res) => {

    const id_loggedIn = req.user_id;
    console.log(req.body.user_to_delete);
    const result = await Followers_Following.findOneAndUpdate({"user": id_loggedIn},{$pull: {following: {name: req.body.user_to_delete.toString()}}},{new: true}).lean().exec()
    const alsothis = await Followers_Following.findOneAndUpdate({"user": req.body.delete_id},{$pull: {followers: {name: req.userName.toString()}}},{new: true}).lean().exec()

    console.log(result);
    res.json(result)

    // res.status(201).json({"userName": "ok"});
}
const addFollower = async (req, res) => {

    const id_loggedIn = req.user_id;
    console.log(typeof id_loggedIn)
    const follower_id = req.body.add_id;
    const result = await Followers_Following.findOneAndUpdate({"user": id_loggedIn},{$push: {following: {name: req.body.user_to_add.toString(), name_id: req.body.add_id}}},{new: true}).lean().exec()
    const alsothis = await Followers_Following.findOneAndUpdate({"user": follower_id},{$push: {followers: {name: req.userName.toString(), name_id: id_loggedIn}}},{new: true}).lean().exec()

    console.log(result);
    console.log(alsothis);
    res.json(result)

    // res.status(201).json({"userName": "ok"});
}

module.exports = {
    getFollowers,
    updateFollowers,
    updateFollowing,
    addFollower
}