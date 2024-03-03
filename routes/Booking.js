const express = require('express');
const bookingController = require('../controllers/Booking');
const router = express.Router();

router.get('/', bookingController.findAll);
router.get('/:id', bookingController.findById);
router.post('/', bookingController.create);
router.put('/:id', bookingController.update);
router.delete('/:id', bookingController.delete);

module.exports = router;
