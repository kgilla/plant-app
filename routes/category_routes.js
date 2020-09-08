const express = require("express");
const router = express.Router();
const category_controller = require("../controllers/categoryController");
const { upload } = require("../config/multer");
const { authUser } = require("./middleware");

router.get("/create", authUser, category_controller.category_create_get);
router.post(
  "/create",
  [upload, authUser],
  category_controller.category_create_post
);
router.get("/:id", category_controller.category_detail);
router.get("/", category_controller.category_list);
router.get("/:id/update", authUser, category_controller.category_update_get);
router.post(
  "/:id/update",
  [upload, authUser],
  category_controller.category_update_post
);
router.get("/:id/delete", authUser, category_controller.category_delete_get);
router.post("/:id/delete", authUser, category_controller.category_delete_post);

module.exports = router;
