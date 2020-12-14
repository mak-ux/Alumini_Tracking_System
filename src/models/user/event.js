const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
  
   user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
    Eventid: Number,
	title: String,
	Description: String,
	Location: String,
    Date: Date,
    state: String,
	time : { type : Date, default: Date.now },
	Status: String,
});

module.exports = mongoose.model("Events", postSchema);
