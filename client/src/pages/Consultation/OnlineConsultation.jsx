import './consultation.css'
import React, { useEffect, useState } from 'react';
import Chat from '../../components/Chat/Chat'; // Implement a chat component
import Video from '../../components/Video/Video'; // Implement a video consultation component
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { io } from 'socket.io-client';
import { useAppointmentContext } from '../../hooks/useAppointmentContext';
import ConsultationForm from '../../components/ConsultationForm/ConsultationForm';
import { useUserContext } from '../../hooks/useUserContext';

const socket = io.connect('https://prince-tele-health-api.onrender.com/');

const OnlineConsultation = () => {
  const { user } = useAuthContext();
  const { users } = useUserContext();
  const { appointmentId } = useParams();
  const { appointments } = useAppointmentContext();
  const [isVideo, setIsVideo] = useState(false);
  const [consultationData, setConsultationData] = useState(null);

  // Find the appointment details
  let event;
  if (appointments) {
    event = appointments.find((a) => a._id === appointmentId);
  }

  let patient
  if (users) {
    patient = users.find((p) => p._id === event.patientId)
  }

  const chatroomId = `chatroom-${appointmentId}`;
  const username = user.username;

  useEffect(() => {
    // Join the chat room when the component mounts
    if (user && chatroomId) {
      socket.emit('join_room', { user: username, room: chatroomId });
    }
  }, [user, chatroomId, username]);

  const handleStartVideo = () => {
    // Set the state to start the video consultation
    setIsVideo(true);
  };

  const handleConsultationFormSubmit = (data) => {

    setConsultationData(data);
  };

  return (
    <div className='Online-consultation'>
      <h2>Online Consultation</h2>
      <p>Welcome to your online consultation!</p>

      <div className='section video-section'>
        <h3>Video Consultation</h3>
        <p>
          You can start your video consultation by clicking the "Start Video Consultation" button below.
        </p>
        <button onClick={handleStartVideo}>Start Video Consultation</button>

      {isVideo && (
        <div className='section live-consultation-section'>
          <h3>Live Consultation on Zoom</h3>
          <p>
            Click the "Join Now" button below to have a real-time video consultation on Zoom.
          </p>
          <a target='blank' href={event.joinUrl}>
            <span role="img" aria-label="Join Now Icon">
              👉
            </span> Join Now
          </a>
        </div>
      )}
      
      </div>

      <div className='section chat-section'>
        <h3>Real-time Chat</h3>
        <p>
          Or have a real-time chat below to communicate with your healthcare provider.
        </p>
        <Chat socket={socket} room={chatroomId} user={username} />
      </div>

      <div className='section record-section'>
        <h3>Consultation Form</h3>
        {user && user.userType !== 'patient' && (
          <ConsultationForm onSubmit={handleConsultationFormSubmit} patient={patient}/>
        )}
      </div>

    </div>
  );
};

export default OnlineConsultation;
