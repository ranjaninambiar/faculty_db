const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
   name: {type: String},
   course_info : {
       id : {
           type : mongoose.Schema.Types.ObjectId,
           ref : 'Course', 
       },
       name : {type: String},
       code : {type: String},
       type : {type: String},
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
   studentInfo: [
    {
        student_info : {
            id : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Student', 
            },
            name : {type: String},
            mentor : {type: String},
            batch: {type: String},       
        },
    },
  ], 
    

});


module.exports = mongoose.model("Class", classSchema);