const express = require("express")
const app =  express();
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user/user.js");
const auth=require('../authentication/user/auth')


const fs = require('fs')
const path = require('path')


app.use(express.json())

router.get("/", (req,res,next) =>{

   res.render('update');

})







router.post("/update",auth,async(req,res) =>{
    //user = (await User.findById(req.user._id))
    User.update({_id: req.user}, {
        fullname: req.body.fullname
    },
   
    function(err, numberAffected, rawResponse) {
       console.log('new profile update ');
       
    });
       
    
    console.log('done');
    res.redirect("/user/home")

    
    
    
        
        //res.send('updated')
        
       

  
})




module.exports = router;