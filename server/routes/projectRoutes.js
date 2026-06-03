const express = require("express");
const router = express.Router();

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", getProjects);

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  createProject
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateProject
);

router.delete(
  "/:id",
  authMiddleware,
  deleteProject
);

module.exports = router;