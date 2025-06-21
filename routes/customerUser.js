//customer login
const Listing = require("../models/listing.js");
const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, validateUser, isOwner, validateListing, requireHost } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js"); // For async error handling
const controller = require("../controller/users.js");


router.get("/",wrapAsync(controller.homePageListing))

router.get("/login/customer",controller.loginCustForm);


router.post("/login/customer",controller.loginCust);

router.get("/signup/customer",(req,res)=>{
  res.render("cust-signup.ejs")
});

router.post("/signup/customer",validateUser,wrapAsync(controller.signupCust));


router.get("/listings",wrapAsync( async (req, res) => {
  let path = req.route.path;
  let listings = await Listing.find({}).sort({ _id: -1 });
  res.render("index.ejs", { listings,path });
}));

router.get("/privacy",(req,res)=>{
  res.render("privacy")
})
router.get("/company",(req,res)=>{
  res.render("company")
})
router.get("/developer",(req,res)=>{
  res.render("developer")
})

module.exports = router;


