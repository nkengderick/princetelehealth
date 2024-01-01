//use .env
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')

//port and connnection string fron .env
const PORT = process.env.PORT;
const SocketPORT = process.env.SocketPORT;
const dbURI = process.env.MONGODB_URI;

//creating express app
const app = express();

//app middleware
app.use(cors());
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


  const server = http.createServer(app)
 const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://price-tele-health.onrender.com"],
    methods: ["GET", "POST"]
  }
 });

 io.on('connection', (socket) => {
  console.log(`User ${socket.id} Connected`)
  
  socket.on('join_room', (data) => {
    socket.join(data)
    console.log(`User ${data.user} joined Room ${data.room}`)
  })

  socket.on('send_message', (data) => {
    socket.to(data.room)
    io.emit('recieve_message', data)
    console.log(data)
  })

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} Diconnected`)
  })
 })
 
 mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then((result) => {
   console.log("connected to db");
   app.listen(PORT, () => {
     console.log(`Server listening on port ${PORT}`)
    });
    io.listen(SocketPORT)
  })
  .catch((err) => console.log(err));

  app.use('/user', require('./routes/userRoute'))
  app.use('/appointment', require('./routes/appointmentroute'))
