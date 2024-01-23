const express = require('express')
const { login } = require('../controller/User');
const { register } = require('../controller/teacher');

const router = express.Router()

router.route('/signup',register)
router.route('/signin',login);

module.exports =router