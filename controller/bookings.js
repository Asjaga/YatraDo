const Listing = require("../models/listing.js");
var flash = require('connect-flash');
const User = require("../models/user.js");
const Booking = require("../models/booking.js");




module.exports.custAllBooking = async(req,res)=>{
  let id = req.user._id;
  let user = await User.findById(id).populate({ path: "booking", populate: { path: "listing" } });
  res.render("mybooking.ejs",{user});
};


module.exports.custBookingView = async(req,res)=>{
  let {booking_id} = req.params;
  let booking = await Booking.findById(booking_id).populate("listing");
  res.render("bookingview.ejs",{booking});
};

module.exports.deleteBooking = async(req,res)=>{
  let {booking_id} = req.params;
  let userid = req.user._id;
  await Booking.findByIdAndDelete(booking_id);
  await User.findByIdAndUpdate(userid,{$pull:{booking:booking_id}});
  req.flash("success","Booking deleted Successfully ")
  res.redirect("/mybooking");
};

module.exports.custCancelBooking = async(req,res)=>{
  let {booking_id} = req.params;
  await Booking.findByIdAndUpdate(booking_id,{status:"Cancelled"});
  req.flash("success","Your Booking is Cancelled");
  res.redirect("/mybooking")
}
module.exports.hostAllBooking = async(req,res)=>{
  let bookings = await Booking.find({}).populate({path:"listing",match: { owner: req.user._id } });
  let filterbooking = bookings.filter(b => b.listing !== null && b.status !== "Cancelled");
  res.render("hostbooking.ejs",{bookings:filterbooking})
};


module.exports.hostBookingView = async(req,res)=>{
  let {booking_id} = req.params;
let booking = await Booking.findById(booking_id).populate("listing");
  let user = await User.findOne({booking:booking_id});
  res.render("hostbookingview.ejs",{booking,user})
};

module.exports.hostConfirmBooking = async(req,res)=>{
  let {booking_id} = req.params;
  let booking = await Booking.findByIdAndUpdate(booking_id,{status:"Confirmed"},{new:true});
  req.flash("success","Booking is Confirmed ")
  res.redirect(`/hostbooking/${booking_id}`);
};

module.exports.hostCancelBooking = async(req,res)=>{
  let {booking_id} = req.params;
  let booking = await Booking.findByIdAndUpdate(booking_id,{status:"Cancelled"});
  req.flash("success","Booking is Cancelled and Deleted")
  res.redirect(`/hostbooking`);
};

module.exports.bookingForm = async(req,res)=>{
  let{id} = req.params;
  let listing = await Listing.findById(id);
  let userid = req.user._id
  let user = await User.findById(userid);
  res.render("booking.ejs",{user,listing})
};


module.exports.custBooking = async(req,res)=>{
  let{id} = req.params;
  let listing = await Listing.findById(id);
  let userid = req.user._id
  let user = await User.findById(userid);
  
  //calculate days
  let calcDays = ()=>{
    let fromDate = new Date(req.body.from_date);
    let toDate= new Date(req.body.to_date);
    let diffTime = toDate - fromDate ; // ms tym

    let days = Math.ceil(diffTime/(24*60*60*1000));
    return days ;
  }

  // calculate totalAmount
  let calcAmt = ()=>{
      let days = calcDays();
      let totalAmt =  req.body.rooms * days * listing.price;
      return totalAmt;
  };

  let showdate = ()=>{
    let from_date = new Date(req.body.from_date); 
    let to_date = new Date(req.body.to_date); 

    const options = {year:"numeric",month:"long",day:"numeric"};

    const readableFrom = from_date.toLocaleDateString("en-IN",options);
    const readableTo = to_date.toLocaleDateString("en-IN",options);

    readable_date = `${readableFrom} to ${readableTo}`;
    return readable_date;
  }

  // declaration
  let totalDays  = calcDays();
  let date = showdate();
  let totalAmount = calcAmt();
  let totalRoom = req.body.rooms;

  let new_booking = await new Booking({totalAmount,totalDays,date,totalRoom,listing});
  await new_booking.save();
  user.booking.push(new_booking);
  await user.save();
  res.render("successbooking.ejs",{new_booking})
};


module.exports