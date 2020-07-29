const mongoose = require('mongoose');
const {host,dbName} = require('../config')

const db_url = "mongodb://"+host+"/"+dbName;
mongoose.connect(
    db_url,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }
);
var db = mongoose.connection;
db.once('open',function(){
    console.log("数据库连接成功");
})
db.on('error',function(){
    console.log("数据库连接失败");
})