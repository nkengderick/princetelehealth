import './dashboard.css'

import React from 'react'

import UpcomingAppointments from '../../components/UpcomingAppointments/Appointments'
import ConsultationHistory from '../../components/ConsultationHistory/ConsultationHistory'
import HealthRecords from '../../components/HealthRecords/HealthRecords'
import BookAppointment from '../../components/BookAppointments/BookAppointments'
import ProfileManagement from '../../components/ManageProfile/ProfileManagement'
import SearchBar from '../../components/Search/SearchBar'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useUserContext } from '../../hooks/useUserContext'

const Dashboard = () => {

  const { user } = useAuthContext();
  const { users } = useUserContext();
  let currentuser;
  if(users){
    currentuser = users.find((u) => user._id === u._id)
  }

  return (
    <div className='Dashboard'>
      <div className="welcome">
        <img src={`http://localhost:5000/${user.image}`} alt="" />
        <h1>Welcome to your dashboard {currentuser ? currentuser.username : null}</h1>
      </div>
      { currentuser && currentuser.userType === 'patient' ? 
          <div>
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
          </div> : null

      }
      {  currentuser && currentuser.userType === 'doctor' ? 
          <div>
            <div className="upcoming-appointments">
              <h2>Your upcoming Appointments</h2>
                <UpcomingAppointments />
            </div>
            <div className="profile">
              <ProfileManagement />
            </div>

          </div> : null

      }
      {  currentuser && currentuser.userType === 'intern' ?  
          <div>

          </div> : null

      }
    </div>
  )
}

export default Dashboard