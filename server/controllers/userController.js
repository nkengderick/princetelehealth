const User = require('../models/User');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, phone, username, password, dob, address, gender, licenseNumber, clinicAddress, specialization, yearsOfExperience, levelAtSchool, schoolName, description, userType } = req.body;
      const role = req.body.userType;
      const imagePath = req.file ? `uploads/${req.file.filename}` : ''
      const newUser = new User({name, email, phone, username, password, dob, address, gender, licenseNumber, clinicAddress, specialization, yearsOfExperience, levelAtSchool, schoolName, description, userType, role, image: imagePath});
      await newUser.save();
      res.status(201).json({user: newUser});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getOneUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getUserByUsernameAndPassword: async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username, password });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = userController;
