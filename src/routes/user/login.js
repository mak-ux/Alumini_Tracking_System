const express = require("express");
var formidable = require('formidable');
const router = express.Router();
const crypto=require('crypto');
const path = require("path");


const multer = require("multer");
const User = require("../../models/user/user.js");
const Admin = require("../../models/user/admin.js");



const auth=require('../../authentication/user/auth')
const {mailverification,resetpassword,collageverification} = require("../../emails/mailverification");
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







	  

  
  

// //<
// //<-------------->TO READ THE USER PROFILE<---------------->

//<------------> USER profile<---------------->




router.get('/home',auth,async(req,res)=>{
	res.render('Mak.ejs')
})


router.get('/notish',auth,async(req,res)=>{
	res.render('notish.ejs')
})

router.get('/form',auth,async(req,res)=>{
	Admin.find({ }, function(err, alumni) {

        if (err) {
            console.log(err);
            console.log("OOPS there's an error");

        } else {

            alumni.forEach(function(alumni_) {
				console.log(alumni_.name );
				 
            });

            //res.render("list_alumini.ejs", { alumini: alumni });
    //res.send({ alumni: alumni })
        }

    });
	
	res.render('form.ejs')
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

router.post('/admin',auth,async(req,res)=>{
const user = await User.findById(req.user._id)
	     
		   //const Admin=new Admin();
		   new Admin({
			
			name: req.body.name
			
			}).save(async(err, doc)=>{
			if(err) res.json(err);
			else {
				
				res.redirect('/user/home')
			}
			
			});
			//user.admin.push(Admin._id);
			//await user.save();
			//console.log(Admin._id)		
})


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
		if(user.username=='kanhaiya12')
		{
			user.isAdmin = true;
		}
		await user.save();
		message = "Mail verified";
	  }
	 /* if(user.username=='kanhaiya12')
			{
				var fullname=user.username;
				User.findOneAndUpdate(
					
					{"isAdmin" :fullname },
				function(err, result){
					if(err) {
						console.log(err);
					}
				});
			}*/
			if(user.collageverified==true && user.mailverified==true)
		{
			res.redirect('/user/signin');
		}
		else{
			//res.send('You Verified you email wait for your collage to verify your identity,Again Click Your gmail link Once your collage verified you')
			res.render('verify_student')
		}
			//res.redirect('/user/signin')
			//res.send('wait For your collage to verify Your identity')

	} catch (e) {
		res.redirect("/user/signup");
	}
  });
  
  
  //collage verify
  router.get("/collageverification", async (req, res) => {
	try {
	  const token = req.query.token;
	  const decode = jwt.verify(token, "thisismyjwtsecret");
  
	  var message = null,
		error = null;
	  if (decode.type !== "collageverification") error = "Wrong token";
  
	  const user = await User.findById({ _id: decode._id });
	  if (!user) error = "Invalid user";
  
	  if (error === null) {
		user.collageverified = true;
		if(user.username=='kanhaiya12')
		{
			user.isAdmin = true;
		}
		await user.save();
		message = "Mail verified by collage";
	  }
	 /* if(user.username=='kanhaiya12')
			{
				var fullname=user.username;
				User.findOneAndUpdate(
					
					{"isAdmin" :fullname },
				function(err, result){
					if(err) {
						console.log(err);
					}
				});
			}*/
			//res.redirect('/user/signin')
			//res.send('Thank You,You verified You alumini')
			res.render('verify_collage')

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
			collageverification('kainhaiyalal@gmail.com', user._id,user.fullname,user.batch);
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
		const user=await User.findOne({username:req.body.username,mobile:req.body.mobile})
		//const user1=await User.findOne({mobile:req.body.mobile})
		//console.log(user1)
		if(!user){
			req.flash('error','Username/mobile is not valid')
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
				
			console.log(user.username)
			if(user.isAdmin == true)
			{
				res.redirect("/user/home");
			}
			else{
				console.log('you are not an admin')
				//res.redirect("/otp");
				res.redirect("/user/home");
			}
				
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
		res.redirect("/user/forget")
		console.log('reset link send');
	}catch(e){
		//res.render('message-reset.ejs',{message:null,error:'Server error'})
		console.log('something is wrong');
	}
})
//My new routes

router.get("/reset-password", async (req, res) => {
	res.render("reset")
})
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
	  //res.render('reset',{token:token})
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
 


/*router.get('/search',auth,async(req,res)=>{
    try{
        const all_products_ids=await User.find({})
        const product_ids=all_products_ids[0][req.query.tag]
        if(product_ids !== 'undefined')
        {
            var all_products=[]
            for(var i=0;i<product_ids.length;i++)
            {
                console.log(product_ids[i])
                if(product_ids[i].user_id)
                {
                    const product=await User.findById({_id:product_ids[i].user_id})
                    all_products=[...all_products,product]
                }                
            }
            res.json({products:all_products})
            //res.render('search.ejs',{data:all_products.reverse(),user:req.user})
        }
    }catch(e){
        res.send(e)
    }
})
router.post('/filters',async(req,res)=>{
    try {
        var ans=[];
        const filter_tags=await User.find({});
        const all_tags=filter_tags[0];
        console.log(all_tags);
        const filters=req.body.filters;//to be applied tags
        console.log(filters);
        const products_for_first_filter=all_tags[filters[0][0]];
        products_for_first_filter.forEach(async (user_id)=>{
            var prod=await User.findById({_id:user_id});
            for(var i=0;i<filters.length;i++)                 // looping through tags (color,size)
            {
                for(var j=0;j<filters[i].length;j++)           // looping through tags value (blue,red,black)
                {
                    if(prod[filters[i]].equals(filters[i][j]))
                    ans.push(prod);
                }
            }
        })
        console.log(ans);
        res.send(ans);
        
    } catch (error) {
        console.log(error);
    }
})*/
//create search get and pot routes

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