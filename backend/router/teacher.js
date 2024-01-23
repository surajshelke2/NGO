const express = require('express');
const { register, login, updateUser, getUsers } = require('../controller/teacher');

const router = express.Router()

router.post('/signup',register)
router.post('/signin',login);

router.post('/update',updateUser);
router.get('/teachers',getUsers);

module.exports =router