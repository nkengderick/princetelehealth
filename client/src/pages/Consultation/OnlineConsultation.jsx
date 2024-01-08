// OnlineConsultation.js
import React, { useEffect, useState } from 'react';
import Chat from '../../components/Chat/Chat'; // Implement a chat component
import Video from '../../components/Video/Video'; // Implement a video consultation component
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { io } from 'socket.io-client'
import { useAppointmentContext } from '../../hooks/useAppointmentContext';
import { Link } from 'react-router-dom';
//import ApiCalendar from 'react-google-calendar-api/ApiCalendar';

const socket = io.connect('https://prince-tele-health-api.onrender.com/')


const OnlineConsultation = ( ) => {
  const { user } = useAuthContext()
  const { appointmentId } = useParams()
  const { appointments } = useAppointmentContext()
  const [ isVideo, setIsVideo ] = useState(false)

  let event;
  if(appointments){
    event = appointments.find((a) => a._id === appointmentId)
  }

  const chatroomId = `chatroom-${appointmentId}`
  const username = user.username

    useEffect(() => {
      if (user && chatroomId) {
        socket.emit('join_room', {user: username, room: chatroomId})
      }
    })
    
    const handleStartVideo = async () => {
      setIsVideo(true)
    }

    return (
    <div>
      <h2>Online Consultation</h2>
      <button onClick={handleStartVideo}>Start Video Consultation</button>
      {isVideo ? (
        <div>
          <h2>Live Consultation on Zoom</h2>
          <a target='blanc' href={event.joinUrl}>Join Now</a>
        </div>
      ) : (
        <div>
          <Chat socket={socket} room={chatroomId} user={username}/>
        </div>
      )}
    </div>
  );
};

export default OnlineConsultation;
