const express = require('express');

const { authMiddleware } = require('../middleware/auth');
const { getAllUnits, createNewUnit, updateUnits, deleteUnits } = require('../controller/unit');
const router = express.Router();

router.get('/:subjectid',getAllUnits);
router.post('/:subjectid/add',createNewUnit);
router.put('/:subjectid/update',updateUnits);
router.delete('/:subjectid/delete/:unitid',deleteUnits);

module.exports = router