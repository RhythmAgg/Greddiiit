const User = require('../models/User')
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
    editUserInfo
}