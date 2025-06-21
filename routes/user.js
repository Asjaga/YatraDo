const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const { isLoggedIn,validateUser, saveRedirectUrl } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js"); // For async error handling
const controller = require("../controller/users.js");
const User = require("../models/user.js")
const Listing = require("../models/listing.js")


// Show signup form
router.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

// Handle user signup
router.post("/signup",validateUser, wrapAsync(controller.signupForm));

// Show login form
router.get("/login", (req, res) => {
  res.render("login.ejs");
});

// Handle login
router.post("/login", saveRedirectUrl, controller.login)

// Handle logout
router.get("/logout", isLoggedIn, controller.logout);

router.get("/profile",async(req,res)=>{
  let id = req.user._id;
  let user= await User.findById(id);
  res.render("profile.ejs",{user});
})


router.post("/profile/edit",async(req,res)=>{
   let {username,email,name,password} = req.body;
    let id = req.user._id;
    let user = await User.findById(id);

  let authRes = await user.authenticate(password);
  if(!authRes.user){
    req.flash("error","Updation Failed : incorrect Password")
    return res.redirect("/profile");
  }
  let updatedUser = await User.findByIdAndUpdate(id,{name,username,email}, { new: true })
  req.login(updatedUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Profile updated successfully!");
      res.redirect("/profile");
    });
});


router.get("/mylistings",async(req,res)=>{
  let id = req.user._id;
  let listings = await Listing.find({owner:id});
  console.log(listings);
  res.render("mylisting.ejs",{listings});
})

module.exports = router;
