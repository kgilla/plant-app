const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.render("home", { title: "Plantarama", success: req.flash("success") });
});

router.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

router.get("/login", (req, res) => {
  res.render("login_form", {
    title: "Log In",
    message: req.flash("message"),
    error: req.flash("error"),
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    successFlash: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/users/create", (req, res, next) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, function (err, hashedPassword) {
    new User({
      username: username,
      password: hashedPassword,
    }).save((err) => {
      if (err) {
        return next(err);
      }
      console.log("successfully saved user");
      res.json({
        message: "Successfully saved user",
      });
    });
  });
});

module.exports = router;
