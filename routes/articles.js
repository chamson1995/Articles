var express = require('express');
var jwt = require('jsonwebtoken')
var router = express.Router();
var userModel = require('../db/usersModel')
var articlesModel = require('../db/articlesModel')
var {checkToken,getArticles,insertArticle,updateArticle,deleteArticle} = require('./urils');
const { updateOne } = require('../db/usersModel');
const fs = require('fs');
const multiparty = require('multiparty')

router.get('/write', (req, res,next) => {
        var {id} = req.query
        if(id){
                getArticles({_id:id},docs=>{
                        if(docs!=null){
                                var doc = JSON.parse(JSON.stringify(docs[0]))
                                res.render('write',{
                                        doc,
                                        username:req.cookies['username']
                                })
                        }else{
                                res.redirect('/users/index')
                        }
                })
        }else{
                res.render('write',{
                        doc:{
                                _id:"",
                                username:req.cookies['username'],
                                content:"",
                                title:""
                        },
                        username:req.cookies['username']
                })
        }
});
router.post('/write', (req, res) => {
        // username:String,
        // title:String,
        // content:String,
        // createTime:Number
        var createTime = new Date(Date.now());
        var {id,username,title,content,createTime} = req.body
        if(id){
                updateArticle({_id:id},{username,title,content,createTime},finished=>{
                        if(finished){
                                res.redirect('/users/index');
                        }else{

                        }
                })
        }else{
                insertArticle({username,title,content,createTime},finished=>{
                        if(finished){
                                res.redirect('/users/index');
                        }else{

                        }
                })
        }

});
router.get('/detail', (req, res) => {
        var {id} = req.query
        console.log(id)
        getArticles({_id:id},docs=>{
                if(docs!=null){
                        var doc = JSON.parse(JSON.stringify(docs[0]))
                        res.render('detail',{
                                doc,
                                username:req.cookies['username']
                        })
                }else{
                        
                }
        })

});
router.get('/delete', (req, res) => {
        var {id} = req.query
        console.log(id)
        deleteArticle({_id:id},docs=>{
                res.redirect('/users/index')
        })
});
router.post('/upload',function(req,res,next){
        var form = new multiparty.Form();
        form.parse(req,function(err,fields,files){
                var filedata = files.filedata[0];
                // {
                //         fieldName: 'filedata',
                //         originalFilename: 'WechatIMG12.jpeg',
                //         path: '/var/folders/6p/fq7g7c2n30gblvwgyp4p03b00000gn/T/qtTWb1EmlyJEYkrcWiTM5qKh.jpeg',
                //         headers: [Object],
                //         size: 25486
                // }
                var read = fs.createReadStream(filedata.path)
                var write = fs.createWriteStream('./public/imgs/'+filedata.originalFilename)
                read.pipe(write);
                write.on('close',()=>{
                        res.send({
                                err:0,
                                msg:'/imgs/'+filedata.originalFilename
                        })
                })
        })

});

module.exports = router;