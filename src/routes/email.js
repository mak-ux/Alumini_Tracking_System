const express = require("express")
const app =  express();
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user/user.js");
const nodemailer = require('nodemailer');


const fs = require('fs')
const path = require('path')

app.use(express.json())
router.get("/alumni/:id/email", function(req, res) {

    User.findById(req.params.id, function(err, foundalumni) {
        if (err) {
            console.log(err);
        } else {
            //render show template with that campground
            console.log(foundalumni);
            res.render("email", {
                alumni: foundalumni
            });
        }
    });

    // res.render("email.ejs", { alumni: alumni });
});

router.post("/alumni/:id/email", function(req, res) {
    //res.render("email.ejs");

    console.log('yes')
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'trytolearntech20@gmail.com',
            pass:'Kanhaiya@12345'
        }
    })
    const string1 = req.params;
    var subject = req.body.Subject;
    var text = req.body.text;

    User.findById(req.params.id, function(err, foundalumni) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/search");

            var string = 'trytolearntech20@gmail.com' + ', ' + 'trytolearntech20@gmail.com';

            var mailOptions = {
                from:'trytolearntech20@gmail.com',
                to: foundalumni.email,
                subject: subject,
                text: text
                    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    });
});


module.exports = router;

