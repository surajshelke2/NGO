const express = require("express");
const {
  getAllClasses,
  createNewClass,
  deleteClass,
  renameClassName,
} = require("../controller/class");
const {authMiddleware} = require("../middleware/auth");
const router = express.Router();

router.get("/",authMiddleware,getAllClasses);
router.post("/add",authMiddleware, createNewClass);
router.put("/rename", authMiddleware, renameClassName);
router.delete("/delete", authMiddleware, deleteClass);

module.exports = router;
