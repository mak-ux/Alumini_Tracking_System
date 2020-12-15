const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    type : {type: String},
    name : {type: String},
    category : {type: String },
    img: [{
        type: String
    }
    ], 
    websiteURL : {type: String},
    description : {type: String},
    time : {type: String},
    clock : {type: String},
    timezone: {type: String},
    date :{type: Number},
    month: {type:String},
    year: {type: Number}
})

module.exports = mongoose.model("Events" , eventSchema);