const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
   
   atdate : {type : Date, default : Date.now()},
   studentInfo: [
    {
        
            id : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Student', 
            },
            name : {type: String},
            mentor : {type: String},
            batch: {type: String},
            status : {type: String},  
            class: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Class', 
            },   
        },

  ], 
    

});


module.exports = mongoose.model("Attendance", attendanceSchema);