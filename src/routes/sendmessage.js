const express = require("express")
const app =  express();
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user/user.js");

const fast2sms = require('fast-two-sms')
 



const fs = require('fs')
const path = require('path')


app.use(express.json())

router.get("/alumni/:id/message", function(req, res) {
    User.findById(req.params.id, function(err, foundalumni) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            console.log(foundalumni);
            res.render("message", {
                alumni: foundalumni
            });
           
        }
    });

});
router.post("/alumni/:id/message", function(req, res) {


    

    var message = req.body.text;
    

    User.findById(req.params.id, function(err, foundalumni) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/search/");
            receiver = foundalumni.mobile;
           var options = {authorization :  , message : message ,  numbers : [receiver]} ;
                fast2sms.sendMessage(options) .then(response=>{
      console.log(response)
    }) .catch((error) => {
                    console.log(error);
                }); //Asynchronous Function.
           
               
               

        }
    })
    

});

module.exports = router;
