const express = require('express');

const authController = require('../controllers/authController');
const gMail = require('../utils/gmail');

const router = express.Router();
router.post('/send-gmail', (req, res) => {
  gMail.sendGMail();
  res.status(200).json({ status: 'success' });
});

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/all-users', authController.protect, authController.getAllUser);

router.post('/send-verification-mail', authController.sendVerficationEmail);

module.exports = router;
