const express = require('express');
const { searchStudents, getStudentById, SubmitResult, searchResultByStudent } = require('../controller/resultController');
const { authMiddleware } = require('../middleware/auth');


const router = express.Router();

router.get('/search',authMiddleware,searchStudents);
router.get('/get',authMiddleware,getStudentById);
router.get('/view',authMiddleware,searchResultByStudent);
router.post('/submit',authMiddleware,SubmitResult);

module.exports =router;