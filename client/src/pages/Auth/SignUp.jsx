import './auth.css'
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import { useSignup } from '../../hooks/useSignup'

const SignUp = () => {
  const { signup, isLoading, error } = useSignup();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    dob: '',
    address: '',
    gender: '',
    licenseNumber: '',
    clinicAddress: '',
    specialization: '',
    yearsOfExperience: '',
    levelAtSchool: '',
    schoolName: '',
    description: '',
    userType: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userType) {
      alert('Please select a user type');
      return;
    }
    await signup(formData.name, formData.email, formData.phone, formData.username, formData.password, formData.dob, formData.address, formData.gender, formData.licenseNumber, formData.clinicAddress, formData.specialization, formData.yearsOfExperience, formData.levelAtSchool, formData.schoolName, formData.description, formData.userType)
  };

  return (
    <div className="Auth">
      <h1>Welcome to TeleHealth!</h1>
      <form className={isLoading ? 'blur' : ''} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label htmlFor="phone">Phone:</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        <label htmlFor="address">Location Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        <label htmlFor="userType">Who are you Registering as?</label>
        <select name="userType" value={formData.userType} onChange={handleChange}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
          <option value="intern">Student, Intern or Volunteer</option>
        </select>
        {formData.userType === 'patient' && (
          <>
            <label htmlFor="dob">Date of Birth:</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            <label htmlFor="gender">Gender:</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </>
        )}
        {formData.userType === 'doctor' && (
          <>
            <label htmlFor="licenseNumber">License Number:</label>
            <input type="text" name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} />
            <label htmlFor="specialization">Specialization:</label>
            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} />
            <label htmlFor="yearsOfExperience">Years of Experience:</label>
            <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
            <label htmlFor="clinicAddress">Which Clinic do you currently work in?:</label>
            <input type="number" name="clinicAddress" value={formData.yearsOfExperience} onChange={handleChange} />
          </>
        )}
        {formData.userType === 'intern' && (
            <>
            <label htmlFor="specialization">Specialization:</label>
            <input type="text" name="specialization" value={formData.specialization} onChange={handleChange} />
            <label htmlFor="levelAtSchool">Level at School:</label>
            <input type="text" name="levelAtSchool" value={formData.levelAtSchool} onChange={handleChange} />
            <label htmlFor="schoolName">School Attending:</label>
            <input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} />
          </>
        )}
        <label htmlFor="description">Describe yourself: </label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
        <button type="submit" disabled={isLoading}>Register</button>
      </form>
      {error && <div className="error">{error}</div>}
      <p>Already have an account <Link to='/log-in'>Log in</Link></p>
      {isLoading && <ClipLoader className="cliploader" />}
    </div>
  );
};

export default SignUp;
