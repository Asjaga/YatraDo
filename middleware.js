const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const { listingSchema, reviewSchema,bookingSchema ,userSchema  } = require("./utils/joischema.js");
const Booking = require("./models/booking.js"); 
const User = require("./models/user.js");
const { Model } = require("mongoose");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must be Logged in")
        return res.redirect("/login/customer");
    }else{next()};
};

module.exports.validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    req.flash("error", error.message);
    return res.redirect(req.get("referer"));
  }
  next();
};

module.exports.saveRedirectUrl = (req,res,next)=>{
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req,res,next)=>{
      let { id } = req.params;
      let listing = await Listing.findById(id);
      if(!listing.owner._id.equals(req.user._id)){
        req.flash("error","You are not Owner of this Listing");
        return res.redirect(`/listing/${id}/view`);
      }else{next()};
 }


 module.exports.isBookingOwner = async(req,res,next)=>{
  let{booking_id} = req.params;
   let booking = await Booking.findById(booking_id).populate({path: "listing",populate: {path: "owner"}});

  if(!booking.listing.owner.equals(req.user._id)){
    req.flash("error","This Place or Hotel is Not Yours..")
    return res.redirect("/hostbooking")
  }else{next()}
 }

 module.exports.isBookingCust = async(req,res,next)=>{
  let{booking_id} = req.params;
  let booking = await Booking.findById(booking_id);
  const isBookingCust = req.user.booking.some(bid => bid.equals(booking._id));
  if((!isBookingCust)){
    req.flash("error","This Booking is Not Yours..")
    return res.redirect("/mybooking");
  }else{next();}
 }

module.exports.requireCust = async(req,res,next)=>{
  if(req.user.role !== "customer"){
    req.flash("error","You are not Customer of YatraDo Please Login as Customer");
    return res.redirect("/login/customer");
  }else{return next();}
  
};


module.exports.isAuthor = async(req,res,next)=>{
    let{id,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals(req.user._id)){
        req.flash("error","You can't Delete this");
        return res.redirect(`/listing/${id}/view`);
    }else{next();}
}

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    req.flash("error", error.message);
    return res.redirect(req.get("referer"));
  }
  next();
};

module.exports.validateBooking = (req, res, next) => {
  const { error } = bookingSchema.validate(req.body);
  if (error) {
    req.flash("error", error.message);
    return res.redirect(req.get("referer"));
  }
  next();
};


module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    req.flash("error", error.message);
    return res.redirect(req.get("referer"));
  }
  next();
};

module.exports.requireHost = (req,res,next)=>{
  if(req.isAuthenticated() && req.user.role == "owner"){
    return next();
  }
  req.flash("error","Only host can access this");
   return res.redirect("/login")
}