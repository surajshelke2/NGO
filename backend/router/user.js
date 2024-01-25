const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const { register, login, updateUser, getUsers, verifyMail } = require('../controller/user.js');

const router = express.Router();

router.post('/signup',register);
router.post('/signin',login);

router.put("/",authMiddleware,updateUser);
router.get("/bulk", authMiddleware,getUsers);

router.get("/verify",verifyMail)


module.exports =router