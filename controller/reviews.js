const Listing = require("../models/listing.js");
const Review = require("../models/review.js");




module.exports.createReview = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body);
  newReview.author = req.user;
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  req.flash("success", "Review added successfully!");
  res.redirect(`/listing/${id}/view`);
}

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Review.findByIdAndDelete(reviewId);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listing/${id}/view`);
}

