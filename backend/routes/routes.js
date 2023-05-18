const router = require('express').Router();
const authController = require('../controller/authController'); 
const authMiddleware = require('../middlewares/authMiddleware');
const activateController = require('../controller/activateController'); 
const roomsController = require('../controller/roomsController');


router.post('/api/send-otp',authController.sendotp);
router.post('/api/verify-otp',authController.verifyOtp);
router.post('/api/activate', authMiddleware, activateController.activate);
router.get('/api/refresh', authController.refresh);
router.post('/api/logout', authMiddleware, authController.logout);
router.post('/api/create-room',authMiddleware, roomsController.create);
router.get('/api/getrooms',authMiddleware,roomsController.getRooms);

module.exports = router;