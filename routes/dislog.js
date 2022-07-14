const express = require('express')
const router = express.Router()
router.use((req,res,next)=>{
    console.log('dislog')
    next()
})

router.get('/communication',(req,res)=>{
    
   
})

module.exports = router