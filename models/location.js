const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    latitude:{
        type:String,
        required:true
    },

    longitude:{
        type:String,
        required:true
    }

}, {timestamps:true});

module.exports = mongoose.model('location', locationSchema);