const express = require('express');
const { getAllSensors, createSensor, getSensorById, updateSensor, deleteSensor } = require('../controllers/sensor.controller');
const authMiddleware = require('../middlewares/auth.Middleware');
const router = express.Router();

router.get('/', getAllSensors);
router.post('/', createSensor);
router.get('/:id', getSensorById);
router.put('/:id', updateSensor);
router.delete('/:id',authMiddleware, deleteSensor);

module.exports = router;