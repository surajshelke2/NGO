const express = require('express');
const { register, login, updateUser, getUsers, verifyMail } = require('../controller/teacher');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router()

router.post('/signup',register)
router.post('/signin',login);

router.put('/update',authMiddleware,updateUser);
router.get('/teachers',authMiddleware,getUsers);
router.get('/verify',verifyMail);

module.exports =router