const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
}).single("image");

const plant_controller = require("../controllers/plantController");
const category_controller = require("../controllers/categoryController");

// Home
router.get("/", plant_controller.home);

/// PLANT ROUTES ///
router.get("/plant/create", plant_controller.plant_create_get);
router.post("/plant/create", upload, plant_controller.plant_create_post);
router.get("/plant/:id/delete", plant_controller.plant_delete_get);
router.post("/plant/:id/delete", plant_controller.plant_delete_post);
router.get("/plant/:id/update", plant_controller.plant_update_get);
router.post("/plant/:id/update", upload, plant_controller.plant_update_post);
router.get("/plant/:id", plant_controller.plant_detail);
router.get("/plants", plant_controller.plant_list);

/// category ROUTES ///
router.get("/category/create", category_controller.category_create_get);
router.post("/category/create", category_controller.category_create_post);
router.get("/category/:id/delete", category_controller.category_delete_get);
router.post("/category/:id/delete", category_controller.category_delete_post);
router.get("/category/:id/update", category_controller.category_update_get);
router.post("/category/:id/update", category_controller.category_update_post);
router.get("/category/:id", category_controller.category_detail);
router.get("/categories", category_controller.category_list);

module.exports = router;
