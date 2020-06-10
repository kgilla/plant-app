const Catagory = require("../models/catagory");
const Plant = require("../models/plant");

// Display list of all catagorys.
exports.catagory_list = function (req, res) {
  Catagory.find().exec((err, list_catagories) => {
    if (err) {
      return next(err);
    }
    res.render("catagory_index", {
      title: "Plant Catagories",
      catagory_list: list_catagories,
    });
  });
};

// Display detail page for a specific catagory.
exports.catagory_detail = async function (req, res) {
  const cat = await Catagory.findById(req.params.id);
  Plant.find({ catagory: cat }).exec((err, plants) => {
    if (err) {
      return next(err);
    }
    res.render("catagory_detail", {
      title: cat.name,
      plants: plants,
    });
  });
};

// Display catagory create form on GET.
exports.catagory_create_get = function (req, res) {
  res.send("NOT IMPLEMENTED: catagory create GET");
};

// Handle catagory create on POST.
exports.catagory_create_post = function (req, res) {
  res.send("NOT IMPLEMENTED: catagory create POST");
};

// Display catagory delete form on GET.
exports.catagory_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: catagory delete GET");
};

// Handle catagory delete on POST.
exports.catagory_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: catagory delete POST");
};

// Display catagory update form on GET.
exports.catagory_update_get = function (req, res) {
  res.send("NOT IMPLEMENTED: catagory update GET");
};

// Handle catagory update on POST.
exports.catagory_update_post = function (req, res) {
  res.send("NOT IMPLEMENTED: catagory update POST");
};
