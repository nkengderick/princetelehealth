import './dashboard.css'

import React from 'react'

import UpcomingAppointments from '../../components/UpcomingAppointments/Appointments'
import ConsultationHistory from '../../components/ConsultationHistory/ConsultationHistory'
import HealthRecords from '../../components/HealthRecords/HealthRecords'
import BookAppointment from '../../components/BookAppointments/BookAppointments'

import { useAuthContext } from '../../hooks/useAuthContext'

const PatientsDashboard = () => {

  const { user } = useAuthContext();

  return (
    <div className='PatientsDashboard'>
        <h2>Welcome to your Dashboard, {user.name}!</h2>
        <UpcomingAppointments />
        <ConsultationHistory />
        <BookAppointment />
        <HealthRecords />
    </div>
  )
}

export default PatientsDashboard