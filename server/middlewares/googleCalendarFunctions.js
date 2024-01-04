const { google } = require('googleapis');
require('dotenv').config();

// Provide the required configuration
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
const calendarId = process.env.CALENDAR_ID;

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: 'v3' });

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+01:00';

const dateTimeForCalendar = () => {
  let date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  let day = date.getDate();
  if (day < 10) {
    day = `0${day}`;
  }
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

  let event = new Date(Date.parse(newDateTime));

  let startDate = event;
  // Delay in end time is 2 hours
  let endDate = new Date(new Date(startDate).setHours(startDate.getHours() + 2));

  return {
    start: startDate,
    end: endDate
  };
};

const insertEvent = async (event) => {
  try {
    let response = await calendar.events.insert({
      auth: auth,
      calendarId: calendarId,
      resource: event,
      conferenceDataVersion: 1,
    });

    if (response.status === 200 && response.statusText === 'OK') {
      return 1;
    } else {
      console.log('Error details:', response.data.error);
      return 0;
    }
  } catch (error) {
    console.log(`Error at insertEvent --> ${error}`);
    return 0;
  }
};

const getEvents = async (dateTimeStart, dateTimeEnd) => {
  try {
    let response = await calendar.events.list({
      auth: auth,
      calendarId: calendarId,
      timeMin: dateTimeStart,
      timeMax: dateTimeEnd,
      timeZone: '(UTC+01:00) West Central Africa'
    });

    let items = response.data.items;
    return items;
  } catch (error) {
    console.log(`Error at getEvents --> ${error}`);
    return 0;
  }
};

const deleteEvent = async (eventId) => {
  try {
    let response = await calendar.events.delete({
      auth: auth,
      calendarId: calendarId,
      eventId: eventId
    });

    if (response.data === '') {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(`Error at deleteEvent --> ${error}`);
    return 0;
  }
};

module.exports = {
  dateTimeForCalendar,
  insertEvent,
  getEvents,
  deleteEvent,
  TIMEOFFSET
};
