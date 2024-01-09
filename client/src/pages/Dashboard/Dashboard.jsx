import './dashboard.css'

import React, { useState } from 'react'

import UpcomingAppointments from '../../components/UpcomingAppointments/Appointments'
import ConsultationHistory from '../../components/ConsultationHistory/ConsultationHistory'
import HealthRecords from '../../components/HealthRecords/HealthRecords'
import BookAppointment from '../../components/BookAppointments/BookAppointments'
import ProfileManagement from '../../components/ManageProfile/ProfileManagement'
import SearchBar from '../../components/Search/SearchBar'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useUserContext } from '../../hooks/useUserContext'
import { useAppointmentContext } from '../../hooks/useAppointmentContext'
import ClipLoader from 'react-spinners/ClipLoader'
import { useRecordContext } from '../../hooks/useRecordContext'

const Dashboard = () => {

  const { user } = useAuthContext();
  const { users } = useUserContext();
  const { appointments } = useAppointmentContext();
  const { records } = useRecordContext();
  const [searchTerm, setSearchTerm ] = useState('')

  let currentuser;
  if(users){
    currentuser = users.find((u) => user._id === u._id)
  }


      const filteredAppointments = searchTerm !== ''
      ? appointments.filter(
        (appointment) =>
          (appointment.patientId === user._id || appointment.doctorId === user._id) &&
          (appointment.date.includes(searchTerm) || appointment.patientId.includes(searchTerm) || appointment.doctorId.includes(searchTerm))
      )
      : []

      const filteredRecords = searchTerm !== ''
      ? records.filter(
        (record) =>
          (record.name === user.name || record.doctor === user.name) &&
          (record.date.includes(searchTerm) || record.name.includes(searchTerm) || record.doctor.includes(searchTerm))
      )
      : []

  if (!users || !appointments) {
    return (
      <div className='loading'>
        <p>Loading your data...</p>
        <ClipLoader className="cliploader" color="var(--color-primary)" />
      </div>
    );
  }

  return (
    <div className='Dashboard'>
      <div className="section welcome">
        <img src={`https://prince-tele-health-api.onrender.com/${user.image}`} alt="" />
        <h1>Welcome to your dashboard {currentuser ? currentuser.username : null}</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {(filteredRecords || filteredAppointments) && (filteredAppointments.length > 0 || filteredAppointments.length > 0) && (
          <p>Search Results For {searchTerm}</p>
        )}
        {(filteredRecords || filteredAppointments) && (filteredAppointments.length === 0 || filteredAppointments.length === 0) && searchTerm !== '' && (
          <p>No Results For {searchTerm}</p>
        )}
      </div>
      { currentuser && currentuser.userType === 'patient' ? 
          <div>
            <div className="section upcoming-appointments">
              <h2>Your upcoming Appointments</h2>
                <UpcomingAppointments filteredAppointments={filteredAppointments} />
            </div>
            <div className="section history">
              <ConsultationHistory />
            </div>
            <div className="section records">
              <HealthRecords user={user} filteredRecords={filteredRecords} />
            </div>
            <div className="section book">
              <h2>Book and appointment with any of the doctors below</h2>
              <BookAppointment />
            </div>
          </div> : null

      }
      {  currentuser && currentuser.userType !== 'patient' ? 
          <div>
            <div className="section upcoming-appointments">
              <h2>Your upcoming Appointments</h2>
                <UpcomingAppointments filteredAppointments={filteredAppointments} />
            </div>
            <div className="section records">
              <HealthRecords user={user} filteredRecords={filteredRecords} />
            </div>
            <div className="section profile">
              <ProfileManagement />
            </div>

          </div> : null

      }

    </div>
  )

}

export default Dashboard;