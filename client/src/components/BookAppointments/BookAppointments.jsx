// BookAppointment.js

import React, { useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';
import { useBookAppointment } from '../../hooks/useBookAppointment';
import Modal from '../Modal/Modal'; // Import the Modal component
import './book.css'; // Import the stylesheet
import { useAuthContext } from '../../hooks/useAuthContext';
import profile from '../../assets/logo.jpeg'

const BookAppointment = () => {
  const { user } = useAuthContext();
  const { users } = useUserContext();
  const { bookAppointment, isLoading, error, message } = useBookAppointment();

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState('online')
  const [status, setStatus] = useState('pending')

  const handleBookAppointment = () => {
    if (selectedDoctor && date && time) {
      const doctorId = selectedDoctor._id;
      const patientId = user._id;

      const adjustedTime = adjustTime(time);

      bookAppointment(doctorId, patientId, date, adjustedTime, location, status);

      setSelectedDoctor(null);
      setDate('');
      setTime('');
      setLocation('');
      setIsModalOpen(false);
    } else {
      alert('Please select a doctor and provide a date/time for the appointment.');
    }
  }
  const adjustTime = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
  
    // Subtract 1 hour
    const adjustedHours = hours - 1;
  
    // Format adjusted time
    const adjustedTime = `${adjustedHours < 10 ? '0' : ''}${adjustedHours}:${minutes}`;
  
    return adjustedTime;
  };

  let workers
  if(users){
      workers = users.filter((worker) => 
      worker.userType === 'doctor' || worker.userType === 'intern'
    )
  }

  return (
    <div className="book-appointment-container">
      <h2>Book an Appointment</h2>
      {isLoading && <p className="loading">Booking...</p>}
      {error && (<p className='error'>Error: {error}</p>)}
      {message && (<p className='message'>Message from server: {message}</p>)}
      {users &&
        workers.length > 0 &&
        workers.map((user) => (
          <div key={user._id} className="doctor-card">
            <img src={user.image ? `https://prince-tele-health-api.onrender.com/${user.image}` : profile} alt="" />
            <h2>{user.name}: {user.userType}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            {user.userType === 'doctor' && (
              <>
                <p>Address: {user.address}</p>
                <p>License Number: {user.licenseNumber}</p>
                <p>Clinic Address: {user.clinicAddress}</p>
                <p>Specialization: {user.specialization}</p>
                <p>Years of Experience: {user.yearsOfExperience}</p>
                <p>Description: {user.description}</p>
              </>
            )}
            {user.userType === 'intern' && (
              <>
                <p>School: {user.schoolName}</p>
                <p>Level at School: {user.levelAtSchool}</p>
                <p>Specialization: {user.specialization}</p>
                <p>Description: {user.description}</p>
              </>
            )}
            <button className="book-button" onClick={() => {
              setSelectedDoctor(user)
              setIsModalOpen(true)
            }}>
              Book Appointment
            </button>
          </div>
        ))}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="modal-form">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

          <label>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
          
          <label>Location:</label>
          <input type="location" value={location} onChange={(e) => setLocation(e.target.value)} />

          <button className="book-button" onClick={handleBookAppointment} disabled={isLoading}>
            Book Appointment
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BookAppointment;
