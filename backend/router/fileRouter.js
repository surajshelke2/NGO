const express = require("express");
const { getAllFilesInAFolder } = require("../controller/fileController");
const { authMiddleware } = require("../middleware/auth");

const router = express();

router.get("/gets/:unitId",authMiddleware, getAllFilesInAFolder);

module.exports = router;
