const Category = require("../models/category");
const Plant = require("../models/plant");
const { body, sanitizeBody, validationResult } = require("express-validator");

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

  sanitizeBody("name").trim().escape(),

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

// Display category delete form on GET.
exports.category_delete_get = function (req, res) {
  res.send("NOT IMPLEMENTED: category delete GET");
};

// Handle category delete on POST.
exports.category_delete_post = function (req, res) {
  res.send("NOT IMPLEMENTED: category delete POST");
};

// Display category update form on GET.
exports.category_update_get = function (req, res) {
  Category.findById(req.params.id).exec((err, category) => {
    if (err) {
      return next(err);
    }
    res.render("category_form", {
      title: "Update Category",
      category: category,
    });
  });
};

// Handle category update on POST.
exports.category_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty"),

  sanitizeBody("name").trim().escape(),

  async (req, res, next) => {
    const errors = validationResult(req);

    let category = new Category({
      name: req.body.name,
      _id: req.params.id,
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
          Category.findByIdAndUpdate(
            req.params.id,
            category,
            {},
            (err, category) => {
              if (err) {
                res.render("error", { err: err });
              }
              res.redirect(category.url);
            }
          );
        }
      });
    }
  },
];
