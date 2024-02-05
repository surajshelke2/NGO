const express = require('express');
const { searchStudents, getStudentById, SubmitResult, searchResultByStudent } = require('../controller/resultController');


const router = express.Router();

router.get('/search',searchStudents);
router.get('/get',getStudentById);
router.get('/view',searchResultByStudent);
router.post('/submit',SubmitResult);

module.exports =router;