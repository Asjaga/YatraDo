const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isOwner, validateListing,validateBooking, requireCust,requireHost } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js"); // For async error handling
const controller = require("../controller/bookings.js");

router.get("/:id",isLoggedIn, requireCust,controller.bookingForm);
router.post("/:id",isLoggedIn,requireCust,validateBooking,wrapAsync(controller.custBooking));

module.exports = router;
