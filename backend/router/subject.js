const express = require('express');
const { getAllSubjects, createNewSubject, updateSubjectName, deleteSubject } = require('../controller/subject');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();


router.get('/:classid',authMiddleware,getAllSubjects);
router.post('/add/:classid',authMiddleware,createNewSubject);
router.put('/update',authMiddleware,updateSubjectName);
router.delete('/delete',authMiddleware,deleteSubject);

module.exports = router