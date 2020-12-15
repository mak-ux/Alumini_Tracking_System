const express = require("express")
const app =  express();
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user/user.js");
const twilio = require('twilio');



const fs = require('fs')
const path = require('path')
const accountSid="ACff51c4d78fd510e6578cdc212d0b9a03";
const authToken="d67023974382b7c2e75608cc405c79d8";
var client = new twilio(accountSid, authToken);

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


    var sender = '+91 9140650274';

    var message = req.body.text;
    

    User.findById(req.params.id, function(err, foundalumni) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/search/");
            receiver = foundalumni.mobile;
           
            client.messages.create({
                    to: receiver,
                    from: sender,
                    body: message
                })
                .then(message => console.log(`
                Checkin SMS sent to Host: $ { foundalumni.name }
                ` + message.sid))
                .catch((error) => {
                    console.log(error);
                });

        }
    })

});

module.exports = router;
