const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const Review = require('../models/review.js');
const User = require('../models/user.js');
const main = async ()=>{
  await mongoose.connect("mongodb+srv://asjaga:DBm7bAwqQ2m44ejO@cluster0.ds7olq8.mongodb.net/yatraDo?retryWrites=true&w=majority&appName=Cluster0")
}
main().then(()=>{
    console.log("Database is Connected")
}).catch(err => console.log(err));

// let intitDb = async ()=>{
//    await Listing.deleteMany({});
//    await Listing.insertMany(initData.data).then((res)=>{
//     console.log("Database is inserted")
//     });
// }
// let intitDb = async ()=>{
//    await Review.deleteMany({});
//    await Review.insertMany(initData.data).then((res)=>{
//     console.log("Database is inserted")
//     });
// }
// let intitDb = async ()=>{
//    await Listing.deleteMany({});
//   // await User.deleteMany({ _id: { $ne: "6847fdb04359d2d0d77afdec" } });
//   //  let list = await User.findById("6847fdb04359d2d0d77afdec")
//    let list = await User.find("6847fdb04359d2d0d77afdec")
//     console.log(list)
    //  list.role = "owner";
    //  list.name = "Aakash Singh"
    //  await list.save();
    //  console.log(list)
// }
// let intitDb = async ()=>{
// const allReviews = await Review.find({});
//   const reviewIds = allReviews.map((r) => r._id); // get _id of all reviews

//   // Fetch all listings and push review IDs
//   const allListings = await Listing.find({});

//   for (let listing of allListings) {
//     listing.reviews.push(...reviewIds); // push all review IDs to each listing
//     await listing.save(); // save updated listing
//   }

//   console.log("✅ All listings updated with reviews.");
// }
// intitDb();

const updateListings = async () => {
  const reviewIds = [
    "6856acd019b8bf1b16f36d45",
    "6856acd019b8bf1b16f36d46",
    "6856acd019b8bf1b16f36d47",
    "6856acd019b8bf1b16f36d48",
    "6856acd019b8bf1b16f36d49",
    "6856acd019b8bf1b16f36d4a"
  ].map(id => new mongoose.Types.ObjectId(id)); // ✅ use `new`

  const listings = await Listing.find({});
  for (let listing of listings) {
    listing.reviews.push(...reviewIds);
    await listing.save();
  }

  console.log("✅ All listings updated with review IDs.");
  mongoose.connection.close();
};

updateListings();