const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: 
    {type:String},
    
})

module.exports = mongoose.model("Admin" , eventSchema);