const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isOwner,isBookingOwner, validateListing, requireHost } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js"); // For async error handling
const controller = require("../controller/bookings.js");



router.get("/",isLoggedIn,requireHost,wrapAsync(controller.hostAllBooking));
router.get("/:booking_id",isLoggedIn,requireHost,isBookingOwner,wrapAsync(controller.hostBookingView));
router.patch("/:booking_id",isLoggedIn,requireHost,isBookingOwner,wrapAsync(controller.hostConfirmBooking));
router.put("/:booking_id",isLoggedIn,requireHost,isBookingOwner,wrapAsync(controller.hostCancelBooking));

module.exports = router;