const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String, required: true, enum: ['pending', 'confirmed', 'rejected'] },
  meetLink: { type: String }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment
