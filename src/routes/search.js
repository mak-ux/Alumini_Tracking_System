const express = require("express")
const app =  express();
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user/user.js");

const Notice = require("../models/notice");
const fs = require('fs')
const path = require('path')


app.use(express.json())

router.get("/", function(req, res) {
    res.render("search.ejs");
});

router.post("/search1", function(req, res) {

    var alumni = req.body;


    var query, query2, query3;
    var fullname, batch;

    if (req.body.fullname) {
        query = req.body.fullname;
    } else {
        query = { $exists: true };
    }

    if (req.body.batch) {
        query2 = req.body.batch;
    } else {
        query2 = { $exists: true };
    }

    if (req.body.college) {
        query3 = req.body.college;
    } else {
        query3 = { $exists: true };
    }
    var query4;
    if (req.body.branch) {
        query4 = req.body.branch;
    } else {
        query4 = { $exists: true };
    }

   
    User.find({ fullname: query, batch: query2, college: query3, branch: query4 }, function(err, alumni) {

        if (err) {
            console.log(err);
            console.log("OOPS there's an error");

        } else {

            alumni.forEach(function(alumni_) {
                console.log(alumni_.fullname);
            });

            res.render("list_alumini.ejs", { alumini: alumni });
            //res.send({ alumni: alumni })
        }

    });



    
});
router.post("/test", function(req, res) {

    var alumni = req.body;
    var fullname=req.body.fullname;


        User.find({"fullname" :fullname }, async(err, alumni)=> {

        if (err) {
            console.log(err);
            console.log("OOPS there's an error");

        } else {

            alumni.forEach(function(alumni_) {
                console.log(alumni_.fullname);
            });

            res.render("list_alumini.ejs", { alumini: alumni });
            //res.send({ alumni: alumni })
        }

    });



    
});
module.exports = router;

