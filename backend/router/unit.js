const express = require('express');

const { authMiddleware } = require('../middleware/auth');
const { getAllUnits, createNewUnit, updateUnits, deleteUnits } = require('../controller/unit');
const router = express.Router();

router.get('/:subjectid',authMiddleware,getAllUnits);
router.post('/:subjectid/add',authMiddleware,createNewUnit);
router.put('/:subjectid/update',authMiddleware,updateUnits);
router.delete('/:subjectid/delete/:unitid',authMiddleware,deleteUnits);

module.exports = router