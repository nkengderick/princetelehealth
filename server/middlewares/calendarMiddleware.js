const { createMeeting, getMeetings, refreshAccessToken } = require('./zoomFunctions')
const { insertEvent, deleteEvent, getEvents, TIMEOFFSET } = require('./googleCalendarFunctions');

// Middleware function to create a calendar event when an appointment is booked
const createCalendarEventMiddleware = async (req, res, next) => {
  try {
    // Assuming the appointment data is available in the request body
    const { patientId, doctorId, date, time, location, status } = req.body;
    
    // Prepare the event object
    const eventSummary = `Event for Appointment between ${req.body.patientId} and ${req.body.doctorId}`;
    const eventDescription = `New meeting for ${patientId} with Doctor ${doctorId}\n at ${time} on ${date} via zoom.`;

    const event = {
        'summary': eventSummary,
        'description': eventDescription,
        'start': {
          'dateTime': `${date}T${time}:00.000${TIMEOFFSET}`,
          'timeZone': '(UTC+01:00) West Central Africa'
        },
        'end': {
            'dateTime': new Date(new Date(`${date}T${time}:00.000${TIMEOFFSET}`).getTime() + 2 * 60 * 60 * 1000),
          'timeZone': '(UTC+01:00) West Central Africa'
        },
      };

    const zoomMeeting = await createMeeting(
      eventSummary,
      time,
      2,
      120,
      '(GMT+01:00) West Central Africa',
      eventDescription
    )


    // Insert the event to the calendar
    const result = await insertEvent(event);

    
    if (result === 1) {
      // Event successfully created
      next();
    } else {
      // Failed to create the event
      res.status(500).json({ error: 'Failed to create calendar event' });
    }
  } catch (error) {
    console.error(`Error at createCalendarEventMiddleware --> ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
    
// Middleware function to delete a calendar event when an appointment is canceled
const deleteCalendarEventMiddleware = async (req, res, next) => {
  try {
    const eventId = req.params.eventId; // Assuming the event ID is provided in the request parameters

    // Delete the event from the calendar
    const result = await deleteEvent(eventId);

    if (result === 1) {
      // Event successfully deleted
      next();
    } else {
      // Failed to delete the event
      res.status(500).json({ error: 'Failed to delete calendar event' });
    }
  } catch (error) {
    console.error(`Error at deleteCalendarEventMiddleware --> ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Middleware function to get calendar events within a date range
const getCalendarEventsMiddleware = async (req, res, next) => {
  try {
    const start = req.query.start; // Assuming start and end dates are provided in the query parameters
    const end = req.query.end;

    // Get calendar events within the specified date range
    const events = await getEvents(start, end);

    // Attach the events to the request object for further processing
    req.calendarEvents = events;

    const zoomMeetings = await getMeetings();

    next();
  } catch (error) {
    console.error(`Error at getCalendarEventsMiddleware --> ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createCalendarEventMiddleware,
  deleteCalendarEventMiddleware,
  getCalendarEventsMiddleware
};
