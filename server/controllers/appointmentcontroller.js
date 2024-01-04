const Appointment = require('../models/Appointment');
const User = require('../models/User');

let meetLink
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
      const meetingLink = generateLink()

      // Check if patient and doctor exist
      const patient = await User.findById(patientId);
      const doctor = await User.findById(doctorId);

      if (!patient || !doctor) {
        return res.status(404).json({ error: 'Patient or doctor not found' });
      }

      const newAppointment = new Appointment({ patientId, doctorId, date, time, location, status, meetingLink });
      await newAppointment.save();
      meetLink = newAppointment.meetingLink;
      res.status(201).json({message: 'Appointment created successfully', meetLink});
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


const generateRandomString = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let randomString = '';
  for (let i = 0; i < 3; i++) {
    randomString += characters[Math.floor(Math.random() * characters.length)];
  }
  randomString += '-';
  for (let i = 0; i < 4; i++) {
    randomString += characters[Math.floor(Math.random() * characters.length)];
  }
  randomString += '-';
  for (let i = 0; i < 3; i++) {
    randomString += characters[Math.floor(Math.random() * characters.length)];
  }
  return randomString;
};

const generateLink = async () => {
  const uniqueId = generateRandomString()
  return `https://meet.google.com/${uniqueId}`
}


module.exports = appointmentsController;
