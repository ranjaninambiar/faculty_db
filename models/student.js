const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    courseInfo: [
        {
          course_info: {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Course",
            },
          },
        },
      ], 

    classInfo: [{
        class_info: {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Class",
            },
          },
    }

    ],
   issueDate : {type : Date, default : Date.now()},
   user_id : {
       id : {
           type : mongoose.Schema.Types.ObjectId,
           ref : 'User',
       },
       faculty : {type: String},
   },
    name : {type: String},
    mentor : {type: String},
    batch: {type: String},       
}, 

);


module.exports = mongoose.model("Student", studentSchema);