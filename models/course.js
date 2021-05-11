const mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

const courseSchema = new mongoose.Schema({
  user_id : {
    id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
    },
    
    username : String,
},
name: {
    type: String,
    trim: true,
  },
type: {
    type: String,
    trim: true,
  },
code: {
    type: String,
    trim: true,
  },
mentor: {
    type: String,
    trim: true,
  },
 domain:{
    type: String,
    trim: true,
  },
  
  period: { type: Number, default: 1 },
  description : String,
  /*
  bookIssueInfo: [
    {
      book_info: {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Issue",
        },
      },
    },
  ],*/
  
});


module.exports = mongoose.model("Course", courseSchema);