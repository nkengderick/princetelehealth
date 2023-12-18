const Appointment = require('../models/Appointment');
const User = require('../models/User');

const appointmentsController = {
  getAllAppointments: async (req, res) => {
    try {
      const appointments = await Appointment.find();
      res.status(200).json(appointments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createAppointment: async (req, res) => {
    try {
      const { patientId, doctorId, date, time, location } = req.body;

      // Check if patient and doctor exist
      const patient = await User.findById(patientId);
      const doctor = await User.findById(doctorId);

      if (!patient || !doctor) {
        return res.status(404).json({ error: 'Patient or doctor not found' });
      }

      const newAppointment = new Appointment({ patientId, doctorId, date, time, location });
      await newAppointment.save();
      res.status(201).json({message: 'Appointment created successfully'});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getOneAppointment: async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const appointment = await Appointment.findById(appointmentId);

      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      res.status(200).json(appointment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = appointmentsController;
