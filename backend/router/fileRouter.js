const express = require("express");
const { getAllFilesInAFolder } = require("../controller/fileController");

const router = express();

router.get("/gets/:unitId", getAllFilesInAFolder);

module.exports = router;
