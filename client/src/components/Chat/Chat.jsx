
import './chat.css'
import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import { IoMdSend } from 'react-icons/io'

const Chat = ({ socket, user, room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);


  const sendMessage = async () => {
    if (newMessage !== '' && !isSending) {
      setIsSending(true);

      const messageData = {
        room: room,
        sender: user,
        message: newMessage,
        time: new Date(Date.now()).getHours() + 'h' + new Date(Date.now()).getMinutes() + 'm',
      };

      try {
        await socket.emit('send_message', messageData);
        //setMessages((prevMessages) => [...prevMessages, messageData]);
        setNewMessage('');
      } finally {
        setIsSending(false);
      }
    }
  };

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    })
  }, [socket])

  return (
    <div className="chat-container" id="chat-container">
      <div clallName='chat-title'>
        <p>Live Consultation Chat</p>
      </div>
      <div className="chat-message">
        <ScrollToBottom className='message-container'>
          {messages.map((message) => {
            return (
              <div className='message' id={user === message.sender ? 'sending' : 'recieving'}>
                <div>
                  <div className="message-data">
                    <p>{message.message}</p>
                  </div>
                  <div className="message-info">
                    <p id='time'>{message.time}</p>
                    <p id='sender'>{message.sender}: </p>
                  </div>
                </div>  
              </div>
            )
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}><IoMdSend /></button>
      </div>
    </div>
  );
};

export default Chat;
