//use .env
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

//port and connnection string fron .env
const PORT = process.env.PORT;
const dbURI = process.env.MONGODB_URI;

//creating express app
const app = express();

//app middleware
app.use(cors());
app.use(express.json())

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
