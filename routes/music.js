var express = require('express');
var router = express.Router();
const fs = require("fs") //导入fs

router.use((req,res,next)=>{
    console.log("usingMusic")
    next()
})

router.get("/song",(req,res)=>{
    console.log('song!!',req.query)
    if(req.query.id === '1'){
        console.log("getID")
        fs.readFile('/app/server/assets/music/kid.m4a',(err , data)=>{
            console.log(data)
            res.send(data)
        })
    }else if(req.query.id === '2'){
        fs.readFile('/app/server/assets/music/Selfmade Orange.mp3',(err , data)=>{
            res.send(data)
        })
    }
})


module.exports = router;