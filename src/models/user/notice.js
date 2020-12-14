const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
  
   user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
	title: String,
	Description: String,
    Date: Date,
    
});

module.exports = mongoose.model("Notice", postSchema);
