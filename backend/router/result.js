const express = require('express');
const { searchStudents } = require('../controller/resultController');


const router = express.Router();

router.get('/search',searchStudents);

module.exports =router;