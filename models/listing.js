const mongoose = require('mongoose');
const Review = require("./review");
const { required } = require('joi');
const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        maxLength:5000
    },
    location:{
        type:String
    },
    country:{
        type:String
    },
    price:{
        type:Number
    },
    image: {
        filename: String,
        url: String,
    },
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    geometry: {
        type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
        },
        coordinates: {
        type: [Number],
        required: true
        }
    },
    category:{
        type:String,
        required:true
    }
})

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
})

const Listing = new mongoose.model("Listing",listingSchema);
module.exports = Listing;