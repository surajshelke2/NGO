const express = require('express');

const { authMiddleware } = require('../middleware/auth');
const { getAllUnits, createNewUnit, updateUnits, deleteUnits } = require('../controller/unit');
const router = express.Router();

router.get('/:id',authMiddleware,getAllUnits);
router.post('/:id/add',authMiddleware,createNewUnit);
router.put('/:id/update',authMiddleware,updateUnits);
router.delete('/:id/delete',authMiddleware,deleteUnits);

module.exports = router