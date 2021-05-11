const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
   course_info : {
       id : {
           type : mongoose.Schema.Types.ObjectId,
           ref : 'Course', 
       },
       name : {type: String},
       type : {type: String},
       code : {type: String},
       mentor : {type: String},
       domain: {type: String},
       period : {type: Number}, 
          
   }, 
   issueDate : {type : Date, default : Date.now()},
   user_id : {
       id : {
           type : mongoose.Schema.Types.ObjectId,
           ref : 'User',
       },
       username : {type: String},
   },
});


module.exports = mongoose.model("Issue", issueSchema);