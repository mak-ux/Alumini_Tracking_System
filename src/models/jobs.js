const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    type : {type: String},
    position : {type: String},
    category : {type: String },
    jobURL : {type: String},
    description : {type: String},
    date :{type: Number},
    month: {type:String},
    year: {type: Number},
    creater:{type: String}
})

module.exports = mongoose.model("Jobs" , eventSchema);