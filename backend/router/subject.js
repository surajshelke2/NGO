const express = require('express');
const { getAllSubjects, createNewSubject, updateSubjectName, deleteSubject } = require('../controller/subject');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();


router.get('/',authMiddleware,getAllSubjects);
router.post('/add',createNewSubject);
router.put('/update',authMiddleware,updateSubjectName);
router.delete('/delete',authMiddleware,deleteSubject);

module.exports = router