const Category = require("../models/category");
const Plant = require("../models/plant");
const { body, validationResult } = require("express-validator");
const fs = require("fs");

// Display category create form on GET.
exports.category_create_get = function (req, res) {
  res.render("category_form", { title: "Add Category" });
};

// Handle category create on POST.
exports.category_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty"),

  async (req, res, next) => {
    const errors = validationResult(req);

    let category = new Category({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Add Category",
        category: category,
        errors: errors.array(),
      });
      return;
    } else {
      Category.findOne({ name: req.body.name }).exec(function (
        err,
        found_category
      ) {
        if (err) {
          return next(err);
        }

        if (found_category) {
          res.redirect(found_category.url);
        } else {
          category.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect(category.url);
          });
        }
      });
    }
  },
];

// Display category update form on GET.
exports.category_update_get = function (req, res) {
  Category.findById(req.params.id).exec((err, category) => {
    if (err) {
      return next(err);
    }
    res.render("category_form", {
      title: "Update Category",
      name: category.name,
      description: category.description,
    });
  });
};

// Handle category update on POST.
exports.category_update_post = [
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
    const { name, description } = req.body;

    if (!errors.isEmpty()) {
      res.render("category_form", {
        title: "Add Category",
        name: name,
        description: description,
        errors: errors.array(),
      });
      return;
    }

    Category.findById(req.params.id).exec((err, category) => {
      if (err) {
        return next(err);
      }
      let categoryImage = "";
      if (category.image) {
        if (req.file) {
          fs.unlink(`public/images/${category.image}`, (err) => {
            if (err) throw err;
            console.log("File deleted!");
          });
          categoryImage = req.file.filename;
        } else {
          categoryImage = category.image;
        }
      } else {
        if (req.file) {
          categoryImage = req.file.filename;
        }
      }
      Category.findByIdAndUpdate(
        req.params.id,
        {
          name: name,
          description: description,
          image: categoryImage,
        },
        {},
        (err, category) => {
          if (err) {
            return next(err);
          }
          res.redirect(category.url);
        }
      );
    });
  },
];

// Display category delete form on GET.
exports.category_delete_get = function (req, res, next) {
  Category.findById(req.params.id).exec((err, category) => {
    if (err) return next(err);
    Plant.find({ category: category }).exec((err, plants) => {
      if (err) return next(err);
      res.json({
        category,
        plants,
      });
    });
  });
};

// Handle category delete on POST.
exports.category_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: category delete POST");
};

// Display list of all categorys.
exports.category_list = function (req, res) {
  Category.find().exec((err, list_catagories) => {
    if (err) {
      return next(err);
    }
    res.render("category_index", {
      title: "Plant Catagories",
      category_list: list_catagories,
    });
  });
};

// Display detail page for a specific category.
exports.category_detail = async function (req, res) {
  const cat = await Category.findById(req.params.id);
  Plant.find({ category: cat }).exec((err, plants) => {
    if (err) {
      return next(err);
    }
    res.render("category_detail", {
      title: cat.name,
      plants: plants,
      category: cat,
    });
  });
};
