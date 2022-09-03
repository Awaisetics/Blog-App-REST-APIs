const express = require('express');
const authController = require('../controllers/AuthController');

const router = express.Router();


router.post('/user/register', authController.register);
router.post('/user/login', authController.login);

module.exports = router;