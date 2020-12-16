const express = require("express")
const app =  express();
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user/user.js");
const fs = require('fs')
const path = require('path')


app.use(express.json())


router.get("/alumini", function(req, res) {

    
   
    User.find({ }, function(err, alumni) {

        if (err) {
            console.log(err);
            console.log("OOPS there's an error");

        } else {

            alumni.forEach(function(alumni_) {
                console.log(alumni_.fullname );
            });

            res.render("list_alumini.ejs", { alumini: alumni });
    //res.send({ alumni: alumni })
        }

    });



    
});
module.exports = router;