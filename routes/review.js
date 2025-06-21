const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isAuthor,validateReview,requireHost } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js"); // For async error handling
const controller = require("../controller/reviews.js");



// Create review
router.post("/", isLoggedIn, validateReview, wrapAsync(controller.createReview));

// Delete review
router.delete("/:reviewId", isLoggedIn,requireHost, isAuthor, wrapAsync(controller.deleteReview));

module.exports = router;
