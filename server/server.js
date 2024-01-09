//use .env
require('dotenv').config()

const axios = require('axios')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const http = require('http')
const { Server } = require('socket.io')

//import Error handling middlwares 
const {logger} = require('./middlewares/logEvents');
const { errorHandler } = require('./middlewares/errorHandler');

//port and connnection string fron .env
const PORT = process.env.PORT;
const dbURI = process.env.MONGODB_URI;

//creating express app
const app = express();

//app middleware
app.use(cors());
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(logger)
app.use(errorHandler)

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
   server.listen(PORT, () => {
     console.log(`Server listening on port ${PORT}`)
    });
  })
  .catch((err) => console.log(err));

  app.get('/zoom',async (req,res)=>{
    const code = req.query.code;
    try{
      const response = await axios.post('https://zoom.us/oauth/token',null,{
            params:{
                grant_type: 'authorization_code',
                code:code,
                redirect_uri: process.env.REDIRECT_URI
            },
            headers:{
                'Authorization':`Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`,
            }
        });
        res.send(response.data);  

    }catch(error){
        console.error('Error',error);
        res.send('Error');
      }
});
      app.use('/user', require('./routes/userRoute'))
      app.use('/appointment', require('./routes/appointmentroute'))
      app.use('/record', require('./routes/recordroute'))
      