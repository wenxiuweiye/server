const express = require('express')

const router = express.Router()
const client = require("../utils/tencentCloud/messageRegister")
const {Login ,register , isNewUser} =require("../utils/mongo/mongodb_lemons")
router.use((req,res,next)=>{
    console.log("useLogin&Register")
    next()
  })

//獲取手機驗證碼
const randomVerification = (Math.random()*1000000).toFixed(0)
router.post('/registerMessage',(req,res)=>{

    const {PhoneNumber} = req.body
    const params = {
        "PhoneNumberSet": [
           PhoneNumber
        ],
        "SmsSdkAppId": "1400700256",
        "TemplateId": "1459670",
        "SignName":"柠萌网",
        "TemplateParamSet":[randomVerification,"2"]
    };
    client.SendSms(params).then(
        (data) => {
          console.log(data);
          res.send({"ok":true,message:"發送成功"})
        },
        (err) => {
          console.error("error", err);
          res.send({"ok":false,message:"發送失敗，請檢查手機號碼是否填寫正確"})
        }
      );
})
//登錄
router.post('/login',(req,res)=>{
    const { username , password } = req.body
    const result = Login(username,password)
        if(result === null){
            res.send({"ok":false,message:"登錄失敗，請檢查賬號或密碼"})
        }else{
            res.send({"ok":true,message:"登錄成功"})
        }
})
//檢查驗證碼（獲取驗證碼之後）
router.post('/check',(req,res)=>{
    const {verification} = req.body
    if(verification === randomVerification){
        res.send({"ok":true,message:"驗證成功"})
    }else{
        res.send({"ok":false,message:"驗證失敗"})
    }
})

//注冊
router.post('/register',(req,res)=>{
    const {username ,password ,PhoneNumber} = req.body
        const result_isNewUser = isNewUser(PhoneNumber)
        if(result_isNewUser === null){
            res.send({"ok":false,message:"該手機號已被注冊使用"})
        }else{
            const result_register = register(username,password,PhoneNumber)
            res.send({"ok":true,message:"注冊成功"})
        }
})

module.exports = router