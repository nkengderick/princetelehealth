// UpcomingAppointments.js

import React from 'react';
import { useAppointmentContext } from '../../hooks/useAppointmentContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useUserContext } from '../../hooks/useUserContext';
import './appointments.css';

const UpcomingAppointments = () => {
  const { user } = useAuthContext();
  const { users } = useUserContext();
  const { appointments } = useAppointmentContext();

  if (!users || !appointments) {
    return null;
  }

  const userAppointments = appointments.filter(
    (appointment) =>
      appointment.patientId === user._id || appointment.doctorId === user._id
  );

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
                Doctor: {users.find((user) => user._id === appointment.doctorId)?.name}
              </p>
              <p className="appointment-info">
                Patient: {users.find((user) => user._id === appointment.patientId)?.name}
              </p>
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
