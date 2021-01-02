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

/*
app.post('/editProfile', isLoggedIn, function(req, res, next){

    User.findById(req.user.id, function (err, user) {

        // todo: don't forget to handle err

        if (!user) {
            req.flash('error', 'No account found');
            return res.redirect('/edit');
        }

        // good idea to trim 
        var email = req.body.email.trim();
        var username = req.body.username.trim();
        var firstname = req.body.firstname.trim();
        var lastname = req.body.lastname.trim();

        // validate 
        if (!email || !username || !firstname || !lastname) { // simplified: '' is a falsey
            req.flash('error', 'One or more fields are empty');
            return res.redirect('/edit'); // modified
        }

        // no need for else since you are returning early ^
        user.email = email;
        user.local.email = email; // why do you have two? oh well
        user.first_name = firstname;
        user.last_name = lastname;
        user.username = username;

        // don't forget to save!
        user.save(function (err) {

            // todo: don't forget to handle err

            res.redirect('/profile/');
        });
    });
});*/

module.exports = router;