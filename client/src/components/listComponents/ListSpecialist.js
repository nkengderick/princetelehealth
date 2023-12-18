import React from 'react';

import { useUserContext } from '../../hooks/useUserContext.js';
import { useAppointmentContext } from '../../hooks/useAppointmentContext.js';

const ListSpecialist = () => {
  const { users } = useUserContext();
  const { appointments } = useAppointmentContext()

  if (!users || !appointments) {
    return null;
  }
  return (
    <ul>
      {users.map((specialist) => (
        <li key={specialist.username}>
          {specialist.name} - {specialist.specialization}
          {specialist.userType}
        </li>
      ))}
      {appointments.map((appoints) => (
        <div key={appoints._id}>
          <p>{appoints.date}</p>
          <p>{appoints.time}</p>
          <p>{appoints.patientId}</p>
          <p>{appoints.doctorId}</p>
          </div>
      ))}
    </ul>
  );
};

export default ListSpecialist;
