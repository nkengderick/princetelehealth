import './dashboard.css'

import React from 'react'

import UpcomingAppointments from '../../components/UpcomingAppointments/Appointments'
import ConsultationHistory from '../../components/ConsultationHistory/ConsultationHistory'
import HealthRecords from '../../components/HealthRecords/HealthRecords'
import BookAppointment from '../../components/BookAppointments/BookAppointments'
import SearchBar from '../../components/Search/SearchBar'

import { useAuthContext } from '../../hooks/useAuthContext'

const PatientsDashboard = () => {

  const { user } = useAuthContext();

  return (
    <div className='PatientsDashboard'>
      <div className="welcome">
        <img src={`http://localhost:5000/${user.image}`} alt="" />
        <h1>Welcome to your dashboard {user.username}</h1>
      </div>
      <div className="upcoming-appointments">
        <h2>Your upcoming Appointments</h2>
          <UpcomingAppointments />
      </div>
      <div className="history">
        <ConsultationHistory />
      </div>
      <div className="records">
        <HealthRecords />
      </div>
      <div className="book">
        <h2>Book and appointment with any of the doctors below</h2>
        <BookAppointment />
      </div>
    </div>
  )
}

export default PatientsDashboard