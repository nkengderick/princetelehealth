// OnlineConsultation.js

import React, { useEffect, useState } from 'react';
import Chat from '../../components/Chat/Chat'; // Implement a chat component
import Video from '../../components/Video/Video'; // Implement a video consultation component
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { io } from 'socket.io-client'
import ApiCalendar from 'react-google-calendar-api/ApiCalendar';

const socket = io.connect('https://prince-tele-health-api.onrender.com/')


const OnlineConsultation = ( ) => {
  const { user } = useAuthContext()
  const { appointmentId } = useParams()
  const [ isVideo, setIsVideo ] = useState(false)
  
  const chatroomId = `chatroom-${appointmentId}`
  const username = user.username
    

    useEffect(() => {
      if (user && chatroomId) {
        socket.emit('join_room', {user: username, room: chatroomId})
      }
    })
    
    const createGoogleMeetLink = async () => {
      try {
        const calendar = new Calendar({
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          redirectUri: process.env.GOOGLE_REDIRECT_URI,
        });

        const event = {
          start: {
            dateTime: new Date().toISOString(), // Adjust start time as needed
            timeZone: 'UTC',
          },
          end: {
            dateTime: new Date(new Date().getTime() + 3600000).toISOString(), // 1 hour duration
            timeZone: 'UTC',
          },
          attendees: [
            { email: user.email }, // Add doctor's email dynamically
          ],
          conferenceData: {
            createRequest: {
              conferenceSolutionKey: { type: 'hangoutsMeet' },
            },
          },
        };
  
        const response = await calendar.events.insert({
          calendarId: 'primary',
          resource: event,
        });
  
        const meetingLink = response.data.hangoutLink;

        setIsVideo(true);
    
    
      } catch (error) {
      console.error('Error creating Google Meet link:', error);
    }
  }
    
    return (
    <div>
      <h2>Online Consultation</h2>
      <button onClick={createGoogleMeetLink}>Start Video Consultation</button>
      {isVideo ? (
        <Video />
      ) : (
        <div>
          <Chat socket={socket} room={chatroomId} user={username}/>
        </div>
      )}
    </div>
  );
};

export default OnlineConsultation;
