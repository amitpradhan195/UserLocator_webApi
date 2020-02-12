const express = require('express');
const Message = require('../models/message');
const auth = require('../auth');
const router = express.Router();

router.route('/', auth.verifyUser)
    .get((req, res, next) =>{
        Message.find({$or:[{'sender': req.user._id}, {'receiver':req.user._id}]})
            .populate('sender')
            .then((message)=>{
                res.json(message);
            }).catch(next);
    })

    .post((req, res, next) => {
        Message.create({sender:req.user._id, receiver:req.body.receiver, message:req.body.message})
            .then((message) => {
                res.json(message);
            }).catch(next);
    });

module.exports = router;