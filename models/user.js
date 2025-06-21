const { required } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        lowercase:true
    },
    name:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["customer","owner","admin"],
        default:"customer"
    },
    booking:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    }]
});

userSchema.plugin(passportLocalMongoose);

let User = new mongoose.model("User",userSchema);
module.exports = User;

