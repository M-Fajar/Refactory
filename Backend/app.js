

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");

require("./src/config/passport");
require("./src/config/google");

const mongodbUri = process.env.MONGODB_URL;

mongoose.connect(
  mongodbUri,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (error) => {
    if (error) console.log(error);
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("html", require("ejs").renderFile);
app.use(express.static(__dirname + "/public"));

app.use(cookieParser());
app.use(
  session({
    secret: "secr3t",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

app.get("/g", (req, res) => {
  res.render("google.ejs");
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});


app.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile.ejs", { user: req.user });
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/g",
    successRedirect: "/profile",
    failureFlash: true,
    successFlash: "Successfully logged in!",
  })
);

app.get("/auth/logout", (req, res) => {
  req.flash("success", "Successfully logged out");
  req.session.destroy(function () {
    res.clearCookie("connect.sid");
    res.redirect("/");
  });
});




var port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

app.listen(port, function () {
  console.log(`Authentication Server listening on port ${port}`);
});