module.exports = {
  authUser: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "You must log in to see that");
    res.redirect("/login");
  },
};
