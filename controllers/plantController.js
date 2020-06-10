var Plant = require("../models/plant");
const Catagory = require("../models/catagory");

exports.home = function (req, res) {
  res.render("home", { title: "Welcome" });
};

// Display list of all plants.
exports.plant_list = function (req, res) {
  Plant.find()
    .populate("catagory")
    .exec((err, list_plants) => {
      if (err) {
        return next(err);
      }
      res.render("plant_index", {
        title: "All Plants",
        plant_list: list_plants,
      });
    });
};

// Display detail page for a specific plant.
exports.plant_detail = function (req, res) {
  Plant.findById(req.params.id)
    .populate("catagory")
    .exec((err, plant) => {
      if (err) {
        return next(err);
      }
      res.render("plant_detail", {
        title: plant.name,
        plant: plant,
      });
    });
};

// Display plant create form on GET.
exports.plant_create_get = function (req, res) {
  Catagory.find().exec((err, catagories) => {
    if (err) {
      return next(err);
    }
    res.render("plant_form", {
      title: "Add A Plant",
      catagories: catagories,
    });
  });
};

// Handle plant create on POST.
exports.plant_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: plant create POST");
};

// Display plant delete form on GET.
exports.plant_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: plant delete GET");
};

// Handle plant delete on POST.
exports.plant_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: plant delete POST");
};

// Display plant update form on GET.
exports.plant_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: plant update GET");
};

// Handle plant update on POST.
exports.plant_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: plant update POST");
};
