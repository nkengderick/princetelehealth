const express = require('express');
const appointmentsController = require('../controllers/appointmentcontroller');
const calendarMiddleware = require('../middlewares/calendarMiddleware')

const router = express.Router();

// Get all appointments
router.get('/all', appointmentsController.getAllAppointments);

// Create a new appointment
router.post('/create', calendarMiddleware.createCalendarEventMiddleware, appointmentsController.createAppointment);

// Get one appointment by ID
router.get('/:id', appointmentsController.getOneAppointment);

// Update an appointment
router.put('/update/:id', appointmentsController.updateAppointment)

module.exports = router;
