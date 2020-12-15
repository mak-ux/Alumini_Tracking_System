const express = require("express")
const app = express()
const bodyParser= require("body-parser")
const cookieParser=require('cookie-parser')
const session=require('express-session')
const flash=require('connect-flash')
const methodOverride = require ('method-override')
const eventroutes = require("./routes/event-routes")
const noticeroutes = require("./routes/notice-routes")




//FOR POSTMAN
app.use(express.json())
app.use(methodOverride('_method'))

// <------------>  DATABASE   <-------------->
require('./db/mongoose')


//<------------->  GETTING DATA FROM POST REQUEST  <---------------->
app.use(bodyParser.urlencoded({extended: true}));


//<------------->  SETTING COOKIES TO THE BROWSER  <----------------->
app.use(cookieParser())

//<------------->  SPECIFY THE PATH OF STATIC FILES(eg. css,javascript)  <-------------------->
app.use(express.static( "public")); 
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
// app.use(methodOverride('_method'));
//<------------->  SETTING MESSAGES FOR REDIRECTING PAGES(i.e. stored in flash session)  <-------------------->
app.use(session({
	secret:'secret123',
	resave:true,
	saveUninitialized:true
}))
app.use(flash())

//<------------->  SETTING GLOBAL VARIABLES  <-------------------->
app.use((req,res,next)=>{
	res.locals.error=req.flash('error')
	res.locals.sucess=req.flash('sucess')
	next()
})



app.get("/",(req,res)=>{
	res.redirect('/user/create')
});




app.use('/user',require('./routes/user/login'));
app.use('/user',require('./routes/user/search'));
app.use("/events", eventroutes);
app.use("/notice", noticeroutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT,function()
		  {
	console.log(`Server has started at ${PORT}`);
});
