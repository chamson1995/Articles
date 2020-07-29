var express = require('express');
var session = require('express-session')
var jwt = require('jsonwebtoken')
var cookieParser = require('cookie-parser')
var router = express.Router();
var userModel = require('../db/usersModel')
var articlesModel = require('../db/articlesModel');
const { render } = require('jade');
var {checkToken} = require('./urils')

router.get('*/login', (req, res) => {
  res.render('login',{})
});
router.get('*/regist', (req, res) => {
  res.render('regist',{})
});
router.get('*/logout', (req, res) => {
  res.cookie('token',"",{ expires: new Date(Date.now() -9999999) })
  res.render('login',{})
});



router.get('*', (req, res,next) => {
    var token = req.cookies['token']
    checkToken(token,isRight=>{
      if(isRight){
        next()
        console.log("next")
      }else{
        res.redirect('/login')
      }
    })
  }
);






/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/users/index')
});
module.exports = router;

