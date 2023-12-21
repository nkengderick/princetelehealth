// OnlineConsultation.js

import React, { useMemo, useState } from 'react';
import Chat from '../../components/Chat/Chat'; // Implement a chat component
import Video from '../../components/Video/Video'; // Implement a video consultation component
import { useParams } from 'react-router-dom';

const OnlineConsultation = ( ) => {
    const { appointmentId } = useParams()
    const [ isVideo, setIsVideo ] = useState(false)
    const generateChatroomId = (appointmentId) => {
        return `chatroom-${appointmentId}`;
      }
    const chatroomId = useMemo(() => generateChatroomId(appointmentId), [appointmentId])

  return (
    <div>
      <h2>Online Consultation</h2>
      {isVideo ? (
        <Video />
      ) : (
        <Chat chatroomId={chatroomId}/>
      )}
    </div>
  );
};

export default OnlineConsultation;
