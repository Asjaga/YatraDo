const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isOwner,requireCust, validateListing,isBookingCust, requireHost } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js"); // For async error handling
const controller = require("../controller/bookings.js");


router.get("/",isLoggedIn,requireCust,wrapAsync(controller.custAllBooking));

router.get("/:booking_id",isLoggedIn,requireCust,isBookingCust,wrapAsync(controller.custBookingView));

router.delete("/:booking_id",isLoggedIn,requireCust,isBookingCust,wrapAsync(controller.deleteBooking));
router.post("/:booking_id",isLoggedIn,requireCust,isBookingCust,wrapAsync(controller.custCancelBooking));


module.exports = router;
