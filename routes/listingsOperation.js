
const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isOwner, validateListing, requireHost } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js"); // For async error handling
const controller = require("../controller/listings.js");

// Show all listings

router.get("/search",wrapAsync(controller.searchListing));

router.get("/filter/:category",wrapAsync(controller.categoryListing));

module.exports = router;