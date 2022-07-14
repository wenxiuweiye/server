const express = require('express');
const router = express.Router();
const fs = require("fs") //导入fs
const path = require('path')

router.use((req,res,next)=>{
  console.log("usingMap")
  next()
})

router.get('/chinaMap', function (req, res) {
  var filePath_map = path.resolve('./')+path.join('/static/map/china.json')
  console.log(filePath_map)
  fs.readFile(filePath_map, (err, data) => {
    res.send(data)
  })
});
router.get("/province", function (req, res) {
  var filePath_map = `/app/server/assets/map/${req.query.name}.json`
  fs.readFile(filePath_map, (err, data) => {
    res.send(data)
  })
})

module.exports = router;