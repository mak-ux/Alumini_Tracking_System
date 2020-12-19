const mongoose = require("mongoose")
const validator =require('validator')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const userSchema = new mongoose.Schema({
	fullname:{
		type:String,
		required:true,
		trim:true
	},
	username:{
		type:String,
		required:true,
		unique:true,
		trim:true
	},
	email:{
		type:String,
		required:true,
		unique:true,
		validate(value){
			if(!validator.isEmail(value)){
				throw new Error('Email not valid')
			}
		}
	},
	age:{
		type:Number,
		required:true
	},
	password:{
		type:String,
		required:true,
		trim:true,
		validate(value){
			if(value.length<6){
				throw new Error()
			}
		}
	},
	
	avatar:{
		type:String
	},
	avatarId: String,
	tokens:[{
		token:{
			type:String,
			required:true
		}
	}],
	
	 
	mailverified:{
		type:Boolean,
		default:false
	},
	collageverified:{
		type:Boolean,
		default:false
	},
	gender:{
		type:String,
	},
	country:{
		type:String,
	},
	
	  
	  userImage : {
		type:String,
		default:'mak.jpg'
	},
	
	
	isAdmin:{
		type:Boolean,
		default:false
	},
	address:{
		type:String,
		
	},
	city:{
		type:String,
		
	},
	mobile:{
		type:String,
		required:true,
		unique:true,
		trim:true
		
	},
	branch: String,
	batch: String,
	college: String,
    state: String,
	country: String,
	admin: [
		{
		  type: mongoose.Schema.Types.ObjectId,
		  ref: "Admin"
		 
		}
	  ]
	
	  
	 
	
});

userSchema.methods.generatingauthtoken=async function(){
	const user=this
	const token=jwt.sign({_id:user._id.toString()},'thisismyjwtsecret2')
	user.tokens=user.tokens.concat({token})
    await user.save()
	return token
}

userSchema.pre('save',async function(next){
	const user=this
	if(user.isModified('password')){
		user.password=await bcrypt.hash(user.password,8)
	}
	next()
})

module.exports = mongoose.model("User",userSchema);
