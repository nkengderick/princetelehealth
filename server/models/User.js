const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['patient', 'doctor', 'intern'], required: true },
    role: { type: String },

    gender: { type: String, enum: [ '', 'male', 'female'] },
    dob: { type: Date },

    licenseNumber: { type: String },
    clinicAddress: { type: String },
    specialization: { type: String },
    yearsOfExperience: { type: Number },
    description: { type: String },

    levelAtSchool: { type: String },
    schoolName: { type: String },

    image: { type: String }
})

const User = mongoose.model('User', userSchema)

module.exports = User
