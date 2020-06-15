const Catagory = require("../models/catagory");
const Plant = require("../models/plant");
const { body, sanitizeBody, validationResult } = require("express-validator");

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
      catagory: cat,
    });
  });
};

// Display catagory create form on GET.
exports.catagory_create_get = function (req, res) {
  res.render("catagory_form", { title: "Add Catagory" });
};

// Handle catagory create on POST.
exports.catagory_create_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty"),

  sanitizeBody("name").trim().escape(),

  async (req, res, next) => {
    const errors = validationResult(req);

    let catagory = new Catagory({
      name: req.body.name,
    });

    if (!errors.isEmpty()) {
      res.render("catagory_form", {
        title: "Add Catagory",
        catagory: catagory,
        errors: errors.array(),
      });
      return;
    } else {
      Catagory.findOne({ name: req.body.name }).exec(function (
        err,
        found_catagory
      ) {
        if (err) {
          return next(err);
        }

        if (found_catagory) {
          res.redirect(found_catagory.url);
        } else {
          catagory.save(function (err) {
            if (err) {
              return next(err);
            }
            res.redirect(catagory.url);
          });
        }
      });
    }
  },
];

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
  Catagory.findById(req.params.id).exec((err, catagory) => {
    if (err) {
      return next(err);
    }
    res.render("catagory_form", {
      title: "Update Catagory",
      catagory: catagory,
    });
  });
};

// Handle catagory update on POST.
exports.catagory_update_post = [
  body("name")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty"),

  sanitizeBody("name").trim().escape(),

  async (req, res, next) => {
    const errors = validationResult(req);

    let catagory = new Catagory({
      name: req.body.name,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render("catagory_form", {
        title: "Add Catagory",
        catagory: catagory,
        errors: errors.array(),
      });
      return;
    } else {
      Catagory.findOne({ name: req.body.name }).exec(function (
        err,
        found_catagory
      ) {
        if (err) {
          return next(err);
        }

        if (found_catagory) {
          res.redirect(found_catagory.url);
        } else {
          Catagory.findByIdAndUpdate(
            req.params.id,
            catagory,
            {},
            (err, catagory) => {
              if (err) {
                res.render("error", { err: err });
              }
              res.redirect(catagory.url);
            }
          );
        }
      });
    }
  },
];
