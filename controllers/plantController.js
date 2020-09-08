const Plant = require("../models/plant");
const Category = require("../models/category");
const { body, validationResult } = require("express-validator");
const fs = require("fs");

// Display plant create form on GET.
exports.plant_create_get = (req, res, next) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return next(err);
    }
    res.render("plant_form", {
      title: "Add A Plant",
      button: "Add Plant",
      categories: categories,
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

  (req, res, next) => {
    const { name, description, category, price, stock } = req.body;
    const errors = validationResult(req);
    const image = req.file ? req.file.filename : "";

    if (!errors.isEmpty()) {
      res.render("plant_form", {
        title: "Add A Plant",
        plant: {
          name: name,
          description: description,
          category: category,
          price: price,
          stock: stock,
        },
        errors: errors.array(),
      });
    } else {
      new Plant({
        name: name,
        description: description,
        category: category,
        price: price,
        stock: stock,
        image: image,
      }).save((err, plant) => {
        if (err) {
          return next(err);
        }
        res.redirect(plant.url);
      });
    }
  },
];

// Display list of all plants.
exports.plant_list = (req, res, next) => {
  Plant.find()
    .populate("category")
    .exec((err, plants) => {
      if (err) {
        return next(err);
      }
      res.render("plant_index", {
        title: "All Plants",
        plant_list: plants,
        success: req.flash("success"),
      });
    });
};

// Display detail page for a specific plant.
exports.plant_detail = (req, res, next) => {
  Plant.findById(req.params.id)
    .populate("category")
    .exec((err, plant) => {
      if (err) {
        return next(err);
      }
      res.render("plant_detail", {
        title: plant.name,
        plant: plant,
        success: req.flash("success"),
      });
    });
};

// Display plant update form on GET.
exports.plant_update_get = (req, res, next) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return next(err);
    }
    Plant.findById(req.params.id)
      .populate("category")
      .exec((err, plant) => {
        if (err) {
          return next(err);
        }
        res.render("plant_form", {
          title: "Update Plant",
          button: "Update Plant",
          plant: plant,
          categories: categories,
        });
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

  (req, res, next) => {
    const errors = validationResult(req);
    const { name, description, category, price, stock } = req.body;
    let plantImage = "";

    if (!errors.isEmpty()) {
      res.render("plant_form", {
        title: "Update Plant",
        plant: {
          name: name,
          description: description,
          category: category,
          price: price,
          stock: stock,
        },
        errors: errors.array(),
      });
    }

    Plant.findById(req.params.id).exec((err, savedPlant) => {
      if (err) {
        return next(err);
      }
      if (savedPlant.image) {
        if (req.file) {
          fs.unlink(`public/images/${savedPlant.image}`, (err) => {
            if (err) throw err;
            console.log("File deleted!");
          });
          plantImage = req.file.filename;
        } else {
          plantImage = savedPlant.image;
        }
      } else {
        plantImage = req.file.filename;
      }
      Plant.findByIdAndUpdate(
        req.params.id,
        {
          name: name,
          description: description,
          category: category,
          price: price,
          stock: stock,
          image: plantImage,
        },
        {},
        (err, plant) => {
          if (err) {
            return next(err);
          }
          res.redirect(plant.url);
        }
      );
    });
  },
];

// Display plant delete form on GET.
exports.plant_delete_get = (req, res, next) => {
  Plant.findById(req.params.id).exec((err, plant) => {
    if (err) {
      return next(err);
    }
    res.render("plant_detail", {
      title: "Delete Plant?",
      plant: plant,
      delete_plant: true,
    });
  });
};

// Handle plant delete on POST.
exports.plant_delete_post = function (req, res) {
  Plant.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Plant deleted successfully");
    res.redirect("/plants");
  });
};

exports.buy_plant = (req, res, next) => {
  const { amount } = req.body;

  Plant.findById(req.params.id).exec((err, plant) => {
    if (err) {
      return next(err);
    }
    const newStock = plant.stock - amount;
    console.log(newStock);

    Plant.findByIdAndUpdate(req.params.id, { stock: newStock }, {}, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Thank you for your purchase");
      res.redirect(plant.url);
    });
  });
};
