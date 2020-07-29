var {token_key} = require('../config')
var jwt = require('jsonwebtoken')
var userModel = require('../db/usersModel')
const articlesModel = require('../db/articlesModel')

function checkToken(token,callback=(isRight)=>{}){
        if(token){
                var {username,password} = jwt.verify(token,token_key)
                userModel.find({username,password}).then(docs=>{
                        if(docs.length>0){
                                callback(true)
                        }
                }).catch(function(params) {
                        callback(false)
                })
        }else{
                callback(false)
        }
}
function getArticles(conditions={},callback=()=>{}){
        articlesModel.find(conditions)
                .then(docs=>{
                        callback(docs)
                })
                .catch(function(){
                        callback(null)
                })
}
function insertArticle(docs,callback=(success)=>{}){
        articlesModel.insertMany(docs)
                .then(function(){
                        callback(true)
                })
                .catch(function(){
                        callback(false)
                })
}
function updateArticle(conditions,docs,callback=(success)=>{}){
        articlesModel.updateOne(conditions,docs)
                .then(function(){
                        callback(true)
                })
                .catch(function(){
                        callback(false)
                })
}
function deleteArticle(conditions,callback=()=>{}){
        articlesModel.deleteOne(conditions).then(function(){
                callback(true);
        }).catch(function(){
                callback(false);
        })
}
module.exports = {checkToken,getArticles,insertArticle,updateArticle,deleteArticle};