// models/record.js
const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
  },
  date: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  signsAndSymptoms: {
    type: [String],
  },
  recommendations: {
    type: [String],
  },
  nextSteps: {
    type: [String],
  },
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
