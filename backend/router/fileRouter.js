const express = require('express');
const { getAllFilesInAFolder } = require('../controller/fileController');


const router = express();
 
router.get('/gets/:classId',getAllFilesInAFolder);


module.exports = router