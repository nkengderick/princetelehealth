// OnlineConsultation.js

import React, { useEffect, useState } from 'react';
import Chat from '../../components/Chat/Chat'; // Implement a chat component
import Video from '../../components/Video/Video'; // Implement a video consultation component
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { io } from 'socket.io-client'

const socket = io.connect('http://localhost:3001')

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

  return (
    <div>
      <h2>Online Consultation</h2>
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
