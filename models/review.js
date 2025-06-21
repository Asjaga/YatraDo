const mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema({
    rating:Number,
    comment:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

let Review = new mongoose.model("Review",reviewSchema);
module.exports = Review;