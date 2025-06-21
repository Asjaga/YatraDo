// Import modules
if(process.env.NODE_ENV != "production"){
  require('dotenv').config() 
}
const wrapAsync = require("./utils/wrapAsync.js");
const express = require("express");
const app = express();
const ejsmate = require('ejs-mate');
const path = require("path");
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
var flash = require('connect-flash');
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Booking = require("./models/booking.js");
const passport = require("passport");
const userRoute = require("./routes/user.js");
const multer  = require('multer');
const { escape } = require('querystring');
const { title } = require('process');
const upload = multer({ dest: 'uploads/' });

const custBookingRoute = require("./routes/custBooking.js");
const bookingRoute = require("./routes/booking.js");
const customerRoute = require("./routes/customerUser.js")
const hostBookingRoute = require("./routes/hostbooking.js");
const listingOperationRoute = require("./routes/listingsOperation.js");


const store = MongoStore.create({
  mongoUrl:process.env.ATLAS_DB,
  crypto:{
    secret:process.env.SECRET
  },
  touchAfter: 24*3600
})

let sessionOption = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie :{
    httpOnly:true,
    expires: Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
  }
}



// Set up EJS and views
app.engine('ejs', ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionOption));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Connect to MongoDB
const main = async () => {
  await mongoose.connect(process.env.ATLAS_DB);
};
main()
  .then(() => console.log("Database is Connected"))
  .catch(err => console.log(err));

// Start server
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});




// Routes
app.use("/",userRoute);
app.use("/listing", listingRoute);
app.use("/listing/:id/review", reviewRoute);
app.use("/mybooking",custBookingRoute);
app.use("/booking",bookingRoute);
app.use("/listings",listingOperationRoute);
app.use("/",customerRoute);
app.use("/hostbooking",hostBookingRoute);


// 404 Page
app.all("/{*any}", (req, res) => {
  res.status(404).render("error404.ejs");
});

// Error handler
app.use((err, req, res, next) => {
  let { statusCode = 501, message = "Something went wrong" } = err;
  res.status(statusCode).render("validaterror.ejs", { message });
});
