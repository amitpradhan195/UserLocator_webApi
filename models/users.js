const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    fullName:{
        type: String,
        required: true
    },
    contactNo:{
        type:String,
        required: true
    },
    profileImage:{
        type: String
    },
    deviceAddress:{
        type: Number,
        default : function() {
            return Math.floor(Math.random()*100000) + 899999
          },
        index: {unique: true}
    }

});
module.exports = mongoose.model('User', userSchema);