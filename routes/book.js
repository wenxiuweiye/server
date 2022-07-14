const express = require("express")
const router = express.Router()
const fs = require("fs")
const path = require('path')
const {findDataAll, findBookDataOne,findOneBook} = require('../utils/mongo/mongodb_lemons')

router.use((req,res,next)=>{
    console.log('book')
    next()
})

router.get('/swiper',(req,res)=>{
    const {index} = req.query
    fs.readFile(path.join(__dirname,'../','/static/swiper/'+index+".jpg"),(err,data)=>{
        console.log(data)
        res.send(data)
    })
})
router.get('/top_total',(req,res)=>{
    const {list} = req.query
    switch (list) {
        case "总榜":
            findDataAll("total_list").then(value=>{
                res.send(value)
            })
            break;
        case "新书榜":
            findDataAll("new_list").then(value=>{
                res.send(value)
            })
            break;
        case "飙升榜":
            findDataAll("raising_list").then(value=>{
                res.send(value)
            })
            break;
        default:
            res.send({"ok":false,message:"undefind"})
            break;
    }
})
router.get("/bookAllMessage",(req,res)=>{
   
    
    console.log("bookAll")
    findDataAll("books").then((value)=>{
       res.send(value) 
    }) 
})
router.get("/bookOneMessage",(req,res)=>{
    const {bookName} = req.query
    findBookDataOne("books",bookName).then((value)=>{
       res.send(value) 
    }) 
})
router.get("/oneBookAllMessage",(req,res)=>{
    const {bookName} = req.query
    findOneBook("books",bookName).then((value)=>{
       res.send(value) 
    }) 
})
router.get("/bookImage",(req,res)=>{
    const {bookName} = req.query
    console.log(bookName)
    fs.readFile(path.join(__dirname,'../','/static/books/'+bookName+'.jpg'),(err,data)=>{
        console.log(err)
        console.log(data)
        res.send(data)
    })
})
// db.books.insert({bookName:"围城",author:"钱钟书",pros:87000,cons:932,price:191.40,label:["幽默","婚姻","讽刺小说"]})
// db.books.insert({bookName:"三体",author:"刘慈欣",pros:222000,cons:2243,price:93,label:["宇宙奥秘","科幻小说"]})
// db.books.insert({bookName:"杀死一只知更鸟",author:"Nelle Harper Lee",pros:222000,cons:2243,price:48,label:["世界名著","美国文学","悬疑推理"]})
// db.books.insert({bookName:"白鹿原",author:"陈忠实",pros:86000,cons:599,price:45,label:["乡土文学","现实主义"]})
// db.books.insert({bookName:"明朝那些事儿",author:"当年明月",pros:159000,cons:1900,price:336,label:["官场","历史",'战争']})
// db.books.insert({bookName:"置身事内：中国政府与经济发展",author:"兰小欢",pros:12000,cons:97,price:65,label:["经济","政治"]})

// //fs.readFile(path.join(__dirname,'../','/static/books/'+'围城.jpg'),(err,data)=>{
//     res.send(data)
// })
module.exports = router;