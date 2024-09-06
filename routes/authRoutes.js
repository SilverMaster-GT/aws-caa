const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/change-password', authController.changePassword);
router.post('/forgot-password', authController.forgotPassword);
router.post('/confirm-forgot-password', authController.confirmForgotPassword);
router.post('/confirm-new-password', authController.confirmNewPassword);

module.exports = router;
