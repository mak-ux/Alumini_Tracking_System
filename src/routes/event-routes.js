const express = require("express")
const app =  express();
const multer = require('multer')
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user/user.js");
const auth=require('../authentication/user/auth')


const Event = require("../models/events");
const fs = require('fs')
const path = require('path')


app.use(express.json())

router.get("/", (req,res,next) =>{

    Event.find({} ,(err,events) =>{
        
         
            res.render("events" ,{
                events: events
            })
        
       
        
    })

})


router.get("/create-event", auth,async(req,res,next) =>{
    
    user = (await User.findById(req.user._id))
    console.log(user)
    if(user.isAdmin==true)
    {
        res.render("create-event")
    }
    else
    {
        res.render("Mak")
    }
    //res.render("create-event")
})

var storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null,path.join(__dirname ,'./../../','/public/uploads')) 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.originalname) 
    } 
}); 
  
var upload = multer({ storage: storage }); 


router.post("/create-event"  ,upload.array('image',5),(req,res) =>{

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
            var file = req.files
            var imgarr = [];
            
           for(var i=0;i<file.length;i++){
               var src = file[i].filename;
                imgarr.push(src);
           }
            console.log(req.files)
            const {type, name,category,websiteURL,description,time,clock,timezone,date} = req.body
            
        if(!req.file){
            console.log("not received")
        }
       var d = new Date(date);
       var month = months[d.getMonth()].slice(0,3);
    
    const newEvent = new Event({
        type,
        name,
        category,
        img: imgarr,
        websiteURL,
        description,
        time,
        clock,
       timezone,
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
        res.redirect("/events/")
       

  
})

router.get("/eventdetail/:eventid" , async (req,res,next) =>{
    const eventid = req.params.eventid;
    console.log(eventid);
    try{
        let eventfind = await Event.findById(eventid);
        res.render("event-detail",{
            event : eventfind
        })
    } catch(err){
        console.log(err)
    }

   
  

   
})


module.exports = router;