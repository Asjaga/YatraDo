const express = require("express");
const router = express.Router({ mergeParams: true });
const { isLoggedIn, isOwner, validateListing, requireHost } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js"); // For async error handling
const controller = require("../controller/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage });


// Create listing form
router.get("/new", isLoggedIn,requireHost, (req, res) => {
  res.render("new.ejs");
});

// Create listing
router.post("/new", isLoggedIn,requireHost,upload.single('image'),validateListing, wrapAsync(controller.createListing));

// View a listing
router.get("/:id/view", wrapAsync(controller.viewListing));

// Edit listing form
router.get("/:id/edit", isLoggedIn,requireHost, isOwner, wrapAsync(controller.editForm));

// Update listing
router.patch("/:id", isLoggedIn,requireHost, isOwner, upload.single('image'), validateListing, wrapAsync(controller.updateListing));

// Delete listing
router.delete("/:id", isLoggedIn,requireHost, isOwner, wrapAsync(controller.deleteListing));

module.exports = router;
