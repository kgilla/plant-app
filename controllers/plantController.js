var Plant = require("../models/plant");
const Catagory = require("../models/catagory");
const { body, sanitizeBody, validationResult } = require("express-validator");

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
exports.plant_create_get = async function (req, res) {
  await Catagory.find().exec((err, catagories) => {
    if (err) {
      return next(err);
    }
    res.render("plant_form", {
      title: "Add A Plant",
      button: "Add Plant",
      catagories: catagories,
    });
  });
};

// // Handle plant create on POST.
exports.plant_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty"),

  body("description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Description must not be empty"),

  sanitizeBody("name").trim().escape(),
  sanitizeBody("description").trim().escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    let plant = new Plant({
      name: req.body.name,
      description: req.body.description,
      catagory: req.body.catagory,
      price: req.body.price,
      stock: req.body.stock,
    });

    if (!errors.isEmpty()) {
      res.render("plant_form", {
        title: "Add A Plant",
        plant: plant,
        errors: errors.array(),
      });
    } else {
      plant.save(function (err) {
        if (err) {
          return next(err);
        }
        res.redirect(plant.url);
      });
    }
  },
];

// Display plant delete form on GET.
exports.plant_delete_get = async function (req, res) {
  await Plant.findById(req.params.id).exec((err, plant) => {
    if (err) {
      return next(err);
    }
    res.render("plant_detail", {
      title: plant.name,
      plant: plant,
      delete_plant: true,
    });
  });
};

// Handle plant delete on POST.
exports.plant_delete_post = function (req, res) {
  Plant.findByIdAndRemove(req.params.id, function deletePlant(err) {
    if (err) {
      return next(err);
    }
    res.redirect("/plants");
  });
};

// Display plant update form on GET.
exports.plant_update_get = async function (req, res) {
  const catagories = await Catagory.find();
  await Plant.findById(req.params.id)
    .populate("catagory")
    .exec((err, plant) => {
      if (err) {
        return next(err);
      }
      res.render("plant_form", {
        title: "Update Plant",
        button: "Update Plant",
        plant: plant,
        catagories: catagories,
      });
    });
};

// Handle plant update on POST.
exports.plant_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty"),

  body("description")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Description must not be empty"),

  sanitizeBody("name").trim().escape(),
  sanitizeBody("description").trim().escape(),

  async (req, res, next) => {
    const errors = validationResult(req);
    let plantImage = "";
    const savedPlant = await Plant.findById(req.params.id);

    if (savedPlant.image) {
      plantImage = savedPlant.image;
    } else {
      plantImage = req.file.filename;
    }

    let plant = new Plant({
      name: req.body.name,
      description: req.body.description,
      catagory: req.body.catagory,
      price: req.body.price,
      stock: req.body.stock,
      image: plantImage,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("plant_form", {
        title: "Update Plant",
        plant: plant,
        errors: errors.array(),
      });
    } else {
      Plant.findByIdAndUpdate(req.params.id, plant, {}, (err, plant) => {
        if (err) {
          return next(err);
        }
        res.redirect(plant.url);
      });
    }
  },
];
