// BookAppointment.js

import React, { useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import { useBookAppointment } from '../../hooks/useBookAppointment';

const BookAppointment = () => {
  const { users } = useUserContext();
  const { bookAppointment, isLoading, error } = useBookAppointment();

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleBookAppointment = () => {
    // Ensure that a doctor is selected and date/time are not empty
    if (selectedDoctor && date && time) {
      // Get the doctor's ID
      const doctorId = selectedDoctor._id;

      // For simplicity, assuming the patient ID is the currently logged-in user
      const patientId = 'patient_id_placeholder';

      // Call the bookAppointment function
      bookAppointment(doctorId, patientId, date, time);

      // Clear the form fields after booking
      setSelectedDoctor(null);
      setDate('');
      setTime('');
    } else {
      alert('Please select a doctor and provide a date/time for the appointment.');
    }
  };

  return (
    <div>
      <h2>Book Appointment</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users &&
        users.length > 0 &&
        users.map((user) => (
          <div key={user._id} className="doctor-card">
            {user.userType === 'doctor' && (
              <>
                 <h2>{user.name}: {user.userType}</h2>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Address: {user.address}</p>
                <p>License Number: {user.licenseNumber}</p>
                <p>Clinic Address: {user.clinicAddress}</p>
                <p>Specialization: {user.specialization}</p>
                <p>Years of Experience: {user.yearsOfExperience}</p>
                <p>Description: {user.description}</p>
                <button onClick={() => setSelectedDoctor(user)}>Book Appointment</button>
              </>
            )}
            {user.userType === 'intern' && (
              <>
              <h2>{user.name}: {user.userType}</h2>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>School: {user.schoolName}</p>
                <p>Level at School: {user.levelAtSchool}</p>
                <p>Specialization: {user.specialization}</p>
                <p>Description: {user.description}</p>
                <button onClick={() => setSelectedDoctor(user)}>Book Appointment</button>
              </>
            )}
            {user.userType === 'patient' && (
              <></>
            )}
          </div>
        ))}
      {selectedDoctor && (
        <div className="appointment-form">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

          <button onClick={handleBookAppointment} disabled={isLoading}>
            Book Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default BookAppointment;
