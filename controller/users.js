const User = require("../models/user.js");
const passport = require("passport");
const Listing = require("../models/listing.js");
var flash = require("connect-flash");


// ===============================
// 🔐 Owner Signup
// ===============================
module.exports.signupForm = async (req, res, next) => {
  try {
    const { username, name, email, password } = req.body;

    const existUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existUser) {
      req.flash("error", "Username or Email already Registered.");
      return res.redirect("/signup");
    }

    const newUser = new User({ username, email, role: "owner", name });
    await newUser.setPassword(password);
    await newUser.save();

    req.login(newUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to YatraDo!");
      res.redirect("/listings");
    });
  } catch (err) {
    next(err);
  }
};


// ===============================
// 🔐 Owner Login
// ===============================
module.exports.login = (req, res, next) => {
  passport.authenticate("local", async (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      req.flash("error", info.message || "Invalid credentials");
      return res.redirect("/login");
    }

    if (user.role !== "owner") {
      req.flash("error", "Only owners can login from this page.");
      return res.redirect("/login/customer");
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      req.flash("success", `Welcome back, ${user.name}!`);
      res.redirect(res.locals.redirectUrl || "/listings");
    });
  })(req, res, next);
};


// ===============================
// 🚪 Logout (Shared)
// ===============================
module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    req.flash("error", "You have been logged out.");
    res.redirect("/listings");
  });
};


// ===============================
// 🏠 Homepage with Listings
// ===============================
module.exports.homePageListing = async (req, res) => {
  try {
    const path = req.route.path;
    const listings = await Listing.find({}).sort({ _id: -1 });
    res.render("index.ejs", { listings, path });
  } catch (err) {
    req.flash("error", "Unable to load listings.");
    res.redirect("/");
  }
};


// ===============================
// 📄 Render Customer Login Form
// ===============================
module.exports.loginCustForm = (req, res) => {
  res.render("cust-login.ejs");
};


// ===============================
// 🔐 Customer Login
// ===============================
module.exports.loginCust = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (!user) {
      req.flash("error", info.message || "Invalid credentials");
      return res.redirect("/login/customer");
    }

    if (user.role !== "customer") {
      req.flash("error", "This is a host account. Please login from host page.");
      return res.redirect("/login");
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      req.flash("success", `Welcome back, ${user.name}!`);
      res.redirect("/");
    });
  })(req, res, next);
};


// ===============================
// 📝 Customer Signup
// ===============================
module.exports.signupCust = async (req, res, next) => {
  try {
    const { username, email, password, name } = req.body;

    const existUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existUser) {
      req.flash("error", "Username or Email already registered.");
      return res.redirect("/signup/customer");
    }

    const newUser = new User({ username, email, name, role: "customer" });
    await newUser.setPassword(password);
    await newUser.save();

    req.login(newUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to YatraDo!");
      res.redirect("/listings");
    });
  } catch (err) {
    next(err);
  }
};
