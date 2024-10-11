const express = require('express');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/all-users', authController.protect, authController.getAllUser);

router.post('/send-verification-mail', authController.sendVerficationEmail);

module.exports = router;
