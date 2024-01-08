// UpcomingAppointments.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppointmentContext } from '../../hooks/useAppointmentContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useUserContext } from '../../hooks/useUserContext';
import { useUpdateAppointment } from '../../hooks/useUpdateAppointment'
import './appointments.css';

const UpcomingAppointments = () => {
  const { user } = useAuthContext();
  const { users } = useUserContext();
  const { appointments } = useAppointmentContext();
  const { updateAppointment, isLoading: isUpdating, error: updateError } = useUpdateAppointment(); 

  const [ apps, setAppointments ] = useState(appointments)

  let currentuser
  if(users){
    currentuser = users.find((u) => user._id === u._id)
  }

  if (!users || !appointments) {
    return null
  }

  const userAppointments = apps.filter(
    (appointment) =>
      appointment.patientId === user._id || appointment.doctorId === user._id
  );

  const handleConfirm = async (appointmentId) => {
    try {
      await updateAppointment(appointmentId, { status: 'confirmed' });
      setAppointments((prevAppointments) => {
        return prevAppointments.map((appointment) => {
          if (appointment._id === appointmentId) {
            return { ...appointment, status: 'confirmed' };
          }
          return appointment;
        });
      });
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      await updateAppointment(appointmentId, { status: 'rejected' });
      setAppointments((prevAppointments) => {
        return prevAppointments.map((appointment) => {
          if (appointment._id === appointmentId) {
            return { ...appointment, status: 'rejected' };
          }
          return appointment;
        });
      });
    } catch (error) {
      console.error('Error rejecting appointment:', error);
    }
  };

    // Function to check if the appointment time is less than 30 minutes away
    const isTimeLessThan30MinutesAway = (appointmentDate, appointmentTime) => {
      const formattedAppointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}:00`);
      const currentDateTime = new Date();
      const timeDifference = formattedAppointmentDateTime.getTime() - currentDateTime.getTime();
      return timeDifference < 30 * 60 * 1000;
    };

  return (
    <div className="upcoming-appointments">
      <h2>Upcoming Appointments</h2>
      {userAppointments && userAppointments.length > 0 ? (
        <ul className="appointments-list">
          {userAppointments.map((appointment) => (
            <li key={appointment._id} className="appointment-item">
              <p className="appointment-info">Date: {appointment.date}</p>
              <p className="appointment-info">Time: {appointment.time}</p>
              { currentuser && currentuser.userType === 'patient' && (
                <p className="appointment-info">
                  Doctor: {users.find((u) => u._id === appointment.doctorId)?.name}
                </p>
              )}
              { currentuser && currentuser.userType !== 'patient' && (
                <p className="appointment-info">
                  Patient: {users.find((u) => u._id === appointment.patientId)?.name}
                </p>
              )}
              <p className="appointment-info">Status: {appointment.status}</p>
              { currentuser && currentuser.userType !== 'patient' &&(
                <div className='appointment-buttons'>                  
                  <button onClick={() => handleConfirm(appointment._id)} disabled={isUpdating}>
                    Confirm
                  </button>
                  <button onClick={() => handleReject(appointment._id)} disabled={isUpdating}>
                    Reject
                  </button>
                </div>
              )}
              {isTimeLessThan30MinutesAway(appointment.date.substring(0, 10), appointment.time) && (
                <Link to={`/consult/${appointment._id}`} className='link-consultation'>Join Consultation Now</Link>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming appointments</p>
      )}
    </div>
  );
};

export default UpcomingAppointments;
