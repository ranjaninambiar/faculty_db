const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
   info : {
       id : {
           type : mongoose.Schema.Types.ObjectId,
           ref : "Course",
       },
       name : String,
   },
   
    category : String,
    
    time : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Issue",
        },
        issueDate : Date,
    },
    
    user_id : {
        id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
        },
        username : String,
    },
    
    entryTime : {
        type : Date,
        default : Date.now(),
    }
});

module.exports =  mongoose.model("Activity", activitySchema);