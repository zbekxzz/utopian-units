const express = require('express')
const HouseController = require('../controllers/House')
const router = express.Router();

router.get('/', HouseController.findAll);
router.get('/:id', HouseController.findOne);
router.post('/', HouseController.create);
router.patch('/:id', HouseController.update);
router.delete('/:id', HouseController.destroy);

module.exports = router