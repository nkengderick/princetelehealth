// Chat.js

import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000')

const Chat = ({ chatroomId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {

    // Join the chat room when the component mounts
    socket.emit('join', chatroomId);

    // Listen for incoming messages in the specific chat room
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg])
    })

    return () => {
      // Leave the chat room when the component unmounts
      socket.emit('leave', chatroomId)
      socket.disconnect()
    }
    // // Scroll to the bottom of the chat when new messages are added
    // const chatContainer = document.getElementById('chat-container');
    // chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const newMessageObj = {
        user: 'patient', // or 'doctor', depending on the sender
        text: newMessage.trim(),
        timestamp: new Date().toISOString(),
      };

      socket.emit('chat message', { chatroomId, message: newMessageObj })

      setMessages([...messages, newMessageObj]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container" id="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user}`}>
            <span>{message.user}: </span>
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
