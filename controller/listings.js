const Listing = require("../models/listing.js");
let mapToken = process.env.TOKEN;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.createListing =  async  (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const listing = new Listing(req.body);
  let response = await geocodingClient.forwardGeocode({
  query: listing.location,
  limit: 1
  })
  .send()

  listing.owner = req.user;
  listing.image.url = url;
  listing.image.filename = filename;
  listing.geometry = response.body.features[0].geometry;
  let savedListing = await listing.save();
  console.log(savedListing )
  req.flash("success", "Listing created successfully!");
  res.redirect("/listings");
}

module.exports.viewListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
    
  let response = await geocodingClient.forwardGeocode({
  query: listing.location,
  limit: 1
  })
  .send()
  listing.geometry = response.body.features[0].geometry;
  await listing.save();

  if (!listing) {
    req.flash("error", "Listing you requested doesn't exist");
    return res.redirect("/listings");
  }

  res.render("view.ejs", { listing });
}

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  listing.image.url = listing.image.url.replace("&auto=format&fit=crop&w=800&q=60","&auto=format&fit=crop&w=250&g=auto&h=150q=auto&f=auto");
  listing.image.url = listing.image.url.replace("/upload","/upload/w_250/q_auto/f_auto");
  res.render("edit.ejs", { listing });
}

module.exports.updateListing = async (req, res) => {

  let { id } = req.params;
  let listing = await Listing.findById(id);
  if((typeof req.file !== "undefined")){
        listing.image.filename = req.file.filename;
        listing.image.url = req.file.path;
  }
  await Listing.findByIdAndUpdate(id, req.body);
  await listing.save();
  req.flash("success", "Listing updated successfully!");
  res.redirect(`/listing/${id}/view`);
}

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing deleted successfully!");
  res.redirect("/listings");
};



module.exports.searchListing = async (req,res)=>{
  function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
 let query = req.query.q;
 let regex = new RegExp(escapeRegex(query),"i");
 let listings = await Listing.find({$or:[{title:regex},{description:regex},{location:regex},{country:regex},{category:regex}] }) 
 res.render("filter-listing.ejs",{listings,query});
};


module.exports.categoryListing = async (req,res)=>{
  let {category} = req.params;
  let listings = await Listing.find({category:category});
  let query = category;

  res.render("filter-listing.ejs",{listings,query})
};

