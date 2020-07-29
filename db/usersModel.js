const mongoose = require('mongoose');

var userModel = mongoose.model('users',{
    username:String,
    password:String,
    createTime:Number
})
module.exports = userModel