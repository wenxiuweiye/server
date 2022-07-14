const fs = require("fs") //导入fs
const path = require("path") //导入path
const express = require('express') //导入express
const app = new express() //实例化express框架
const routerMap = require("./routes/map.js") //引入路由
const routerMusic = require("./routes/music.js") //引入路由
const routerBook = require('./routes/book.js')
const routerLoginAndRegister = require('./routes/login&register')
const routerdislog = require('./routes/dislog')
const {join} = require('path')
const bodyParser = require('body-parser')
// console.log(path.join(path.resolve(__dirname),"/public/build"))
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  next();
});
app.use(express.static(join(__dirname,'/public')))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/assets/map', routerMap)
app.use('/assets/music', routerMusic)
app.use('/assets/book',routerBook)
app.use("/loginAndRegister",routerLoginAndRegister)
app.use('/assets/dislog',routerdislog)
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(3033, console.log("ready") )