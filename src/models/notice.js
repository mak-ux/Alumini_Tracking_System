
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
    
    title: String,
    description : {type: String},
   

    date :{type: Number},
    month: {type:String},
    year: {type: Number},
    creater:{type: String,default:'HOD'}
})

module.exports = mongoose.model("Notice" , noticeSchema);