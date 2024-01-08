const Record = require('../models/record');

const createRecord = async (req, res) => {
  try {
    const {
      name,
      doctor,
      phone,
      dob,
      address,
      gender,
      signsAndSymptoms,
      recommendations,
      nextSteps,
    } = req.body;

    const newRecord = new Record({
      name,
      doctor,
      phone,
      dob,
      address,
      date: new Date(),
      gender,
      signsAndSymptoms,
      recommendations,
      nextSteps,
    });

    const savedRecord = await newRecord.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Controller function to get all records
const getAllRecords = async (req, res) => {
  try {
    const records = await Record.find();
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  createRecord,
  getAllRecords,
};
