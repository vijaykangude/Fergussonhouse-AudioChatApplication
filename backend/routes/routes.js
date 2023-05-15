const router = require('express').Router();
const authController = require('../controller/authController'); 


router.post('/api/send-otp',authController.sendotp);
router.post('/api/verify-otp',authController.verifyOtp);

module.exports = router;