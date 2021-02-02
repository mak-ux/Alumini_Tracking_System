const express = require("express")
const axios = require("axios")
const app = express()
const bodyParser= require("body-parser")
const cookieParser=require('cookie-parser')
const session=require('express-session')
const flash=require('connect-flash')
const methodOverride = require ('method-override')
const eventroutes = require("./routes/event-routes")
const noticeroutes = require("./routes/notice-routes")
const searchroutes = require("./routes/search")
const emailroutes = require("./routes/email")
const messageroutes = require("./routes/sendmessage")
const listroutes = require("./routes/list")
const updateroutes = require("./routes/update")
const otproutes = require("./routes/otp")
const jobroutes = require("./routes/job")
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const User = require("./models/user/user.js");

const auth=require('./authentication/user/auth')


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
//new section
app.route("/posts")
  .get(function (req, res) {
    axios
      .get("https://jsonplaceholder.typicode.com/photos")
      .then(function (result) {
        res.render("list", {
         items: result.data
		});
		//res.send( result.data)
      })
      .catch(function (error) {
        // handle errors appropriately
		//res.render("error", { error });
		res.send('error');
      });
  });
  app.post("/data",async(req,res) =>{
    
	res.send('done');
  
})
//new field



app.use('/user',require('./routes/user/login'));
//app.use('/user',require('./routes/user/search'));
app.use("/events", eventroutes);
app.use("/notice", noticeroutes);
app.use("/search", searchroutes);
app.use("/email", emailroutes);
app.use("/message", messageroutes);
app.use("/list", listroutes);
app.use("/update", updateroutes);
app.use("/otp", otproutes);
app.use("/job", jobroutes);
//chat section
app.get('/user/chat',auth, async(req, res)=>{
	user = (await User.findById(req.user._id))
    console.log(user)
    res.render('index1.ejs',{user:user});
});

io.sockets.on('connection', function(socket) {
    socket.on('username', function(username) {
		socket.username = username;
		console.log(socket.username)
        io.emit('is_online', ' <i>' + socket.username + ' join the chat..</i>');
    });

    socket.on('disconnect', function(username) {
		
        io.emit('is_online', ' <i>' + socket.username + ' left the chat..</i>');
    })

    socket.on('chat_message', function(message) {
		console.log(message)
		io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
		
    });

});
const PORT = process.env.PORT || 3000;
server.listen(PORT,function()
		  {
	console.log(`Server has started at ${PORT}`);
});
