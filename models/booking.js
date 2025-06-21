const mongoose = require('mongoose');
const Review = require("./review");
const { required } = require('joi');
const { name } = require('ejs');

const bookingSchema = mongoose.Schema({
    totalAmount :{
        type:Number,
        required:true,
    },
    totalDays :{
        type:Number,
        required:true
    },
    totalRoom : {
        type:Number,
        required:true
    },
    date :{
        type:String,
        required:true
    },

    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing",
        required:true
    },
    status:{
        type:String,
        enum:["Processing","Confirmed","Cancelled "],
        default:"Processing"
    }
});

const Booking = mongoose.model("Booking",bookingSchema);

module.exports = Booking;