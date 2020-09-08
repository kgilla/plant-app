const express = require("express");
const router = express.Router();
const plant_controller = require("../controllers/plantController");
const { upload } = require("../config/multer");
const { authUser } = require("./middleware");

/// PLANT ROUTES ///
router.get("/create", authUser, plant_controller.plant_create_get);
router.post("/create", [authUser, upload], plant_controller.plant_create_post);
router.get("/:id", plant_controller.plant_detail);
router.get("/", plant_controller.plant_list);
router.get("/:id/update", authUser, plant_controller.plant_update_get);
router.post(
  "/:id/update",
  [upload, authUser],
  plant_controller.plant_update_post
);
router.get("/:id/delete", authUser, plant_controller.plant_delete_get);
router.post("/:id/delete", authUser, plant_controller.plant_delete_post);
router.post("/:id", plant_controller.buy_plant);

module.exports = router;
