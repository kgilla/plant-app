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
const catagory_controller = require("../controllers/catagoryController");

// Home
router.get("/", plant_controller.home);

/// PLANT ROUTES ///
router.get("/plant/create", plant_controller.plant_create_get);
router.post("/plant/create", plant_controller.plant_create_post);
router.get("/plant/:id/delete", plant_controller.plant_delete_get);
router.post("/plant/:id/delete", plant_controller.plant_delete_post);
router.get("/plant/:id/update", plant_controller.plant_update_get);
router.post("/plant/:id/update", upload, plant_controller.plant_update_post);
router.get("/plant/:id", plant_controller.plant_detail);
router.get("/plants", plant_controller.plant_list);

/// catagory ROUTES ///
router.get("/catagory/create", catagory_controller.catagory_create_get);
router.post("/catagory/create", catagory_controller.catagory_create_post);
router.get("/catagory/:id/delete", catagory_controller.catagory_delete_get);
router.post("/catagory/:id/delete", catagory_controller.catagory_delete_post);
router.get("/catagory/:id/update", catagory_controller.catagory_update_get);
router.post("/catagory/:id/update", catagory_controller.catagory_update_post);
router.get("/catagory/:id", catagory_controller.catagory_detail);
router.get("/catagories", catagory_controller.catagory_list);

module.exports = router;
