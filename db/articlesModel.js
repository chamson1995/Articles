const mongoose = require('mongoose');

var articlesModel = mongoose.model('articles',{
    username:String,
    title:String,
    content:String,
    createTime:Number
})
module.exports = articlesModel