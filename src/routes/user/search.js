const express = require("express");
var formidable = require('formidable');
const router = express.Router();
const crypto=require('crypto');
const path = require("path");

const multer = require("multer");
const tags = require("../../models/user/query.js");
const bodyParser= require("body-parser")
const User = require("../../models/user/user.js");

fs = require('fs-extra')
const mak=User.find({})


console.log(mak)
//tags.push()
router.get("/search",(req,res)=>{
	res.render("search.ejs")
})
module.exports = router;