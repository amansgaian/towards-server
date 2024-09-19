const mongoose = require('mongoose');
const schema  =  mongoose.Schema;

const UserSchema = new schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    },
    role :{
        type : String,
        enum : ["passenger" , "driver" , "admin"],
        default : "passenger"
    }
}, {timestamps : true});


module.exports = mongoose.model("User" , UserSchema);