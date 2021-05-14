const mongoose = require("mongoose");

const assignSchema = new mongoose.Schema({
   issueDate : {type : Date, default : Date.now()},
   user_id : {
       id : {
           type : mongoose.Schema.Types.ObjectId,
           ref : 'User',
       },
       username : {type: String},
   },
   class: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Class',
    },
    as_info:{
        inst: {type: String},
        file: { data: Buffer, contentType: String },
    },
    
   
});


module.exports = mongoose.model("Assignment", assignSchema);