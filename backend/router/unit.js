const express = require('express');

const { authMiddleware } = require('../middleware/auth');
const { getAllUnits, createNewUnit, updateUnits, deleteUnits } = require('../controller/unit');
const router = express.Router();


router.get('/',authMiddleware,getAllUnits);
router.post('/add',authMiddleware,createNewUnit);
router.put('/update',authMiddleware,updateUnits);
router.delete('/delete',authMiddleware,deleteUnits);

module.exports = router