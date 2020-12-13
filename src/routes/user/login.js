const express = require("express");
var formidable = require('formidable');
const router = express.Router();
const crypto=require('crypto');
const path = require("path");

const multer = require("multer");
const User = require("../../models/user/user.js");

const auth=require('../../authentication/user/auth')
const {mailverification,resetpassword} = require("../../emails/mailverification");
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken');

const bodyParser= require("body-parser")

fs = require('fs-extra')

router.use(bodyParser.urlencoded({extended: true}))



router.get("/signup",(req,res)=>{
	res.render("signup.ejs");
});


router.get('/create',async(req,res)=>{
	res.render("create.ejs")
})



router.get("/signin",(req,res)=>{
	res.render("index.ejs")
})
router.get("/reset",(req,res)=>{
	res.render("reset.ejs")
})

router.get("/forget",(req,res)=>{
	res.render("forget.ejs")
})




// //<-------------->for photo upload<---------------->







	  

  
  router.get("/search",auth, async(req,res)=>{
	res.render("chorus search.ejs")
})

// //<
// //<-------------->TO READ THE USER PROFILE<---------------->

//<------------> USER profile<---------------->


router.get('/setting',auth,async(req,res)=>{
	res.render('setting.ejs')
})
router.get('/notification',auth,async(req,res)=>{
	res.render('notification.ejs')
})
router.get('/home',auth,async(req,res)=>{
	res.render('Mak.ejs')
})

router.get('/event',auth,async(req,res)=>{
	res.render('events.ejs')
})
router.get('/notish',auth,async(req,res)=>{
	res.render('notish.ejs')
})


// USER profile

//<------------>TO LOGOUT THE USER<---------------->
router.get('/logout',auth,async(req,res)=>{
	try{
		req.user.tokens=req.user.tokens.filter((token)=>{
			return req.token!==token.token
		})
		await req.user.save()
		res.redirect('/')
	}catch(e){
		res.redirect('/')
	}
})
//new field



//new field

//Verify the mail id

router.get("/mailverification", async (req, res) => {
	try {
	  const token = req.query.token;
	  const decode = jwt.verify(token, "thisismyjwtsecret");
  
	  var message = null,
		error = null;
	  if (decode.type !== "mailverification") error = "Wrong token";
  
	  const user = await User.findById({ _id: decode._id });
	  if (!user) error = "Invalid user";
  
	  if (error === null) {
		user.mailverified = true;
		await user.save();
		message = "Mail verified";
	  }
	  res.redirect("/user/signin");

	} catch (e) {
		res.redirect("/user/signup");
	}
  });
  



//======================================
//
//				POST ROUTES   (CHANGES WITH DATABASE AND AUTHORIZATION)
//
//======================================
//server.js

 

router.get("/postme" ,(req,res) =>{
	res.render('uploadYourpic')
  })
router.post('/postme',auth, function(req, res) {
	var form =new formidable.IncomingForm();
	form.parse(req);
	let reqPath= path.join(__dirname, '../../../');
	let newfilename;
	form.on('fileBegin', function(name, file){
		file.path = reqPath+ 'public/upload/'+ req.user.username + file.name;
		newfilename= req.user.username+ file.name;
	});
	form.on('file', function(name, file) {
		User.findOneAndUpdate({
			username: req.user.username
		},
		{
			'userImage': newfilename
		},
		function(err, result){
			if(err) {
				console.log(err);
			}
		});
	});
	req.flash('success_msg', 'Your profile picture has been uploaded');
	res.redirect('/user/home')
});

router.post("/signup",async(req,res)=>{ 
	//let test=new Object
	try{
		console.log("i m here");
		const email=await User.findOne({email:req.body.email})
		const username=await User.findOne({username:req.body.username})
		
		console.log('yes')
		if(email)
		{
			console.log('yes')
			req.flash('error','Email is already register!')
			res.redirect('/user/signup')
		}
		else if(username)
		{
			console.log('yes')
			req.flash('error','Username is already register!')

			res.redirect('/user/signup')
		}
		else
		{
			console.log('yes')
			const user=new User(req.body)
			await user.save()
			
			mailverification(user.email, user._id);
			req.flash('error','Email is sent Verify email to login!')
			res.redirect('/user/signup')
			
		}
	}catch(e){
		console.log(e)
		res.send(e)
	}
});


//   CORRECT IT!!!!!!!!
router.post('/signin',async (req,res)=>{
	try{
		const user=await User.findOne({username:req.body.username})
		if(!user){
			req.flash('error','Username is not registered')
			res.redirect('/user/signin')
		}
		else
		{
			const isMatch=await bcryptjs.compare(req.body.password,user.password)
			if(!isMatch){
				req.flash('error','Invalid password')
				res.redirect('/user/signin')
			}
			else
			{
				const token=await user.generatingauthtoken()
				res.cookie('auth_token_2',token)
				res.redirect('/user/home')
			}
		}
	}catch(e){
		res.send('server error')
	}
})

router.post('/forget-password',async(req,res)=>{
	try{
		var message=null,error=null
		const user=await User.findOne({email:req.body.email})
		if(user === null)
		error='Email is not registered'

		if(error === null)
		{
			resetpassword(req.body.email);
			message='Check you emailid and reset your password.'
		}
		res.render("reset.ejs")
		console.log('reset link send');
	}catch(e){
		//res.render('message-reset.ejs',{message:null,error:'Server error'})
		console.log('something is wrong');
	}
})
//My new routes


//my new routes

router.post("/reset-password", async (req, res) => {
	try {
	  const token = req.body.token;
	  const decode = jwt.verify(token, "thisismyjwtsecret2");
  
	  var message = null,
		error = null;
	  if (decode.type !== "resetpassword") error = "Wrong token!!";
  
	  if (error === null) {
		const user = await User.findOne({ email: decode.emailid });
		const password = req.body.password;
		user.password = password;
		await user.save();
		message = "Password changed sucessfully";
	  }
	  res.redirect('/user/signin')
	} catch (e) {
		res.send('oops')
	}
  });
  
  router.get('/alumini',auth,async(req,res)=>{
	let newUser = {};

	newUser = (await User.findById(req.user._id))
	res.render('alumini.ejs',{user:newUser})
})

module.exports = router;







/*<div class="container-fluid"></div>
  <h5>Aluminies</h5>
    <% if( user){ %>
      <ul >
        <li><p><%= user.fullname %></p></li>
        <li><p><%= user.username %></p></li>
        <li><p><%= user.age %></p></li>
       
        
      </ul>
      
    
    
    
      <% } %>
  </div>*/