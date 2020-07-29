var express = require('express');
var jwt = require('jsonwebtoken')
var {token_key} = require('../config')
var router = express.Router();
var userModel = require('../db/usersModel')
var articlesModel = require('../db/articlesModel');
const { checkToken } = require('./urils');
/* GET users listing. */
// router.get('/login', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/login', (req, res,next) => {
  var {username,password} = req.body
  userModel.find({username,password}).then(docs=>{
    if(docs.length>0){
      var token = jwt.sign({username,password},token_key)
      res.cookie('token',token,{ expires: new Date(Date.now() + 30*60*1000) })
      res.cookie('username',username,{ expires: new Date(Date.now() + 30*60*1000) })
      res.redirect('/users/index')
    }else{
      res.send("登陆失败")
    }
  })
});
router.post('/regist', (req, res,next) => {
  var {username,password} = req.body;
  userModel.find({"username":username}).then(docs=>{
    if(docs.length>0){
      res.send({
        code:0,
        msg:"用户已被注册"
      })
    }else{
      var createTime = Date.now();
      userModel.insertMany({username,password,createTime}).then(docs=>{
        res.send({
          code:1,
          msg:"注册成功"
        })
      })
    }
  }).catch(function(err){
    res.redirect('/regist')
  });
});

router.get('/index', (req, res) => {
    var page = +req.query.page || 1
    var count = +req.query.count || 5
    console.log({page,count})
    articlesModel.find().then(docs=>{
      var total = docs.length/count;
      articlesModel.find().skip((page-1)*count).limit(count).then(docs=>{
        var list = JSON.parse(JSON.stringify(docs))
        res.render('index',{
          data:{
            list,
            total
          },
          username:req.cookies['username']
        })
      })
      
    })
});


module.exports = router;
