const { createMeeting, refreshAccessToken } = require('../middlewares/zoomFunctions'); 
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
      const { patientId, doctorId, date, time, location, status } = req.body;

      // Check if patient and doctor exist
      const patient = await User.findById(patientId);
      const doctor = await User.findById(doctorId);

      if (!patient || !doctor) {
        return res.status(404).json({ error: 'Patient or doctor not found' });
      }

      refreshAccessToken()
      const start = new Date(new Date(`${date}T${time}:00`))
      const meetingResponse = await createMeeting(`New Appointment for ${patient.username} with Doctor ${doctor.name}\n at ${time} on ${date} via zoom`, start, 2, 120, 'UTC+01:00', `Appointment details:\nDate: ${date}\nTime: ${time}\nLocation: ${location}\nStatus: ${status}`);
      const joinUrl = meetingResponse.join_url;

      const newAppointment = new Appointment({ patientId, doctorId, date, time, location, status, joinUrl });
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

  updateAppointment: async (req, res) => {
    try {
      const appointmentId = req.params.id;
      const { date, time, location, status } = req.body;

      // Check if the appointment exists
      const existingAppointment = await Appointment.findById(appointmentId);
      if (!existingAppointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      // Update appointment details
      existingAppointment.date = date || existingAppointment.date;
      existingAppointment.time = time || existingAppointment.time;
      existingAppointment.location = location || existingAppointment.location;
      existingAppointment.status = status || existingAppointment.status;

      // Save the updated appointment
      await existingAppointment.save();

      res.status(200).json({ message: 'Appointment updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = appointmentsController;
