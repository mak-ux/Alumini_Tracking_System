const express = require("express")
const app =  express();
const multer = require('multer')
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user/user.js");
const auth=require('../authentication/user/auth')


const JOB = require("../models/jobs");
const fs = require('fs')
const path = require('path')


app.use(express.json())

router.get("/newjob", (req,res) =>{

    JOB.find({} ,(err,jobs) =>{
        
         
            res.render("alljobs" ,{
                jobs: jobs
            })
        
       
        
    })
    

})


router.get("/create-job", auth,async(req,res,next) =>{
    
    user = (await User.findById(req.user._id))
    console.log(user)
    
    res.render("create-job")
})




router.post("/create-job",auth,async(req,res) =>{
    user = (await User.findById(req.user._id))
    var months = new Array();
    months[0] = "January";
    months[1] = "February";
    months[2] = "March";
    months[3] = "April";
    months[4] = "May";
    months[5] = "June";
    months[6] = "July";
    months[7] = "August";
    months[8] = "September";
    months[9] = "October";
    months[10] = "November";
    months[11] = "December";
        const {type,position,category,jobURL,description,date} = req.body
            
       
       var d = new Date(date);
       var month = months[d.getMonth()].slice(0,3);
       
    
    const newJOB = new JOB ({
        type,
        position,
        category,
        jobURL,
        description,
       date: d.getDate(),
       month: month,
       year: d.getFullYear(),
       creater: user.fullname
    })

    
    
    
        try{
            newJOB.save();
          
        }
        catch(err){
          console.log(err)
       }
        console.log(newJOB);
        res.redirect("/job/newjob")
       
        
       

  
})
router.get("/jobdetail/:jobid" , async (req,res,next) =>{
    const jobid = req.params.jobid;
    console.log(jobid);
    try{
        let jobfind = await JOB.findById(jobid);
        res.render("job-detail",{
            job : jobfind 
        })
    } catch(err){
        console.log(err)
    }

   
  

   
})


module.exports = router;