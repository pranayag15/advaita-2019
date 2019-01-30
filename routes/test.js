var express = require('express');
var router = express.Router();

router.get("/try", (req, res)=>{
     res.render("try");
 })
 router.post("/try", (req, res)=>{
     console.log(req.body);
     res.json(req.body);
 })

module.exports = router;