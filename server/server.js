//use .env
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const http = require('http')
const socketIO = require('socket.io')

//port and connnection string fron .env
const PORT = process.env.PORT;
const dbURI = process.env.MONGODB_URI;

//creating express app
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('join', (chatroomId) => {
    socket.join(chatroomId);
  });

  // Handle chat messages
  socket.on('chat message', ({chatroomId, msg}) => {
    io.to(chatroomId).emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


//app middleware
app.use(cors());
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("connected to db");
    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    });
  })
  .catch((err) => console.log(err));

  app.use('/user', require('./routes/userRoute'))
  app.use('/appointment', require('./routes/appointmentroute'))
