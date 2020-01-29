const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const router = express.Router();


router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function (err, hash){
        if(err){
            throw new Error('Could not hash!');
        }
        User.create({
            username:req.body.username,
            password:hash,
            fullName: req.body.fullName,
            contactNo: req.body.contactNo,
            profileImage: req.body.profileImage
        }).then((user) => {
            let token = jwt.sign({_id: user._id}, process.env.SECRET);
            res.json({status: "Signup success", user: user._id, token:token});
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({username:req.body.username})
        .then((user) => {
            if(user == null){
                let err = new Error('User not found!');
                err.status = 401;
                return next(err);
            }
            else{
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if(!isMatch){
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({_id:user._id}, process.env.SECRET);
                        res.json({status: 'Login Successful', user: user._id, fullName: user.fullName, username: user.username, token: token});
                    }).catch(next);
            }
        }).catch(next);
});

module.exports = router;