const express = require("express")
const app =  express();
const router = express.Router();
const mongoose = require("mongoose");


const Notice = require("../models/notice");
const fs = require('fs')
const path = require('path')


app.use(express.json())

router.get("/", (req,res,next) =>{

    Notice.find({} ,(err,notice) =>{
        
         
            res.render("view_notice" ,{
                notice: notice
            })
        
       
        
    })

})



router.get("/create-notice", (req,res,next) =>{
    res.render("notish")

})



router.post("/create-notice"  ,(req,res) =>{

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
        const {title,description,date} = req.body
            
       
       var d = new Date(date);
       var month = months[d.getMonth()].slice(0,3);
       
    
    const newEvent = new Notice ({
        title,
        description,
       date: d.getDate(),
       month: month,
       year: d.getFullYear()
    })

    
    
    
        try{
            newEvent.save();
          
        }
        catch(err){
          console.log(err)
       }
        console.log(newEvent);
        res.redirect("/notice/")
        
       

  
})




module.exports = router;