const mongoose = require("mongoose");

let postSchema = new mongoose.Schema({
  
   searchu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = mongoose.model("searchu", postSchema);
