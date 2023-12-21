// UpcomingAppointments.js

import React from 'react';
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

  let currentuser
  if(users){
    currentuser = users.find((u) => user._id === u._id)
  }

  if (!users || !appointments) {
    return null;
  }

  const userAppointments = appointments.filter(
    (appointment) =>
      appointment.patientId === user._id || appointment.doctorId === user._id
  );

  const handleConfirm = async (appointmentId) => {
    try {
      await updateAppointment(appointmentId, { status: 'confirmed' });
    } catch (error) {
      console.error('Error confirming appointment:', error);
    }
  };

  const handleReject = async (appointmentId) => {
    try {
      await updateAppointment(appointmentId, { status: 'rejected' });
    } catch (error) {
      console.error('Error rejecting appointment:', error);
    }
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
              <p className="appointment-info">
                Doctor: {users.find((u) => u._id === appointment.doctorId)?.name}
              </p>
              <p className="appointment-info">
                Patient: {users.find((u) => u._id === appointment.patientId)?.name}
              </p>
              <p className="appointment-info">Status: {appointment.status}</p>
              { currentuser && currentuser.userType !== 'patient' &&(
                <div>                  
                  <button onClick={() => handleConfirm(appointment._id)} disabled={isUpdating}>
                    Confirm
                  </button>
                  <button onClick={() => handleReject(appointment._id)} disabled={isUpdating}>
                    Reject
                  </button>
                </div>
              )}
              <Link to={`/consult/${appointment._id}`}>Join consultation Now</Link>
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
