import './appointments.css'

import React from 'react';
import { useAppointmentContext } from '../../hooks/useAppointmentContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useUserContext } from '../../hooks/useUserContext';

const UpcomingAppointments = () => {
  const { user } = useAuthContext()
  const { users } = useUserContext()
  const { appointments } = useAppointmentContext()
  
    if(!users || !appointments) {
      return null
    }

  const userAppointments = appointments.filter(
    (appointment) =>
      appointment.patientId === user._id || appointment.doctorId === user._id
  );
    return (
      <div>
      <h2>Upcoming Appointments</h2>
      {userAppointments && userAppointments.length > 0 ? (
        <ul>
          {userAppointments.map(appointment => (
            <li key={appointment._id}>
              <p>Date: {appointment.date}</p>
              <p>Time: {appointment.time}</p>
              <p>Doctor: {users.find(user => user._id === appointment.doctorId)?.name}</p>
              <p>Patient: {users.find(user => user._id === appointment.patientId)?.name}</p>
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
