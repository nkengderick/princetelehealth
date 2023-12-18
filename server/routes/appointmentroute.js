const express = require('express');
const appointmentsController = require('../controllers/appointmentcontroller');

const router = express.Router();

// Get all appointments
router.get('/all', appointmentsController.getAllAppointments);

// Create a new appointment
router.post('/create', appointmentsController.createAppointment);

// Get one appointment by ID
router.get('/:id', appointmentsController.getOneAppointment);

module.exports = router;
