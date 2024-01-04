const fs = require('fs').promises;
const path = require('path');
const process = require('process');
const {authenticate} = require('@google-cloud/local-auth');
const {google} = require('googleapis');

async function createMeetLink() {
  // Load client secrets from a file
  const content = await fs.readFile('../');
  const credentials = JSON.parse(content);
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Set up OAuth2 client
  oAuth2Client.setCredentials(/* Load saved token here */);

  // Create Google Calendar API client
  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

  // Create a Google Meet event
  const event = {
    summary: 'Online Consultation Meeting',
    description: 'Meeting for online consultation',
    start: {
      dateTime: new Date().toISOString(),
      timeZone: 'Your-Time-Zone',
    },
    end: {
      dateTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
      timeZone: 'Your-Time-Zone',
    },
    conferenceData: {
      createRequest: {
        requestId: 'your-unique-request-id',
      },
    },
  };

  try {
    const calendarResponse = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
      conferenceDataVersion: 1,
    });

    // Extract the Meet link from the response
    const meetLink = calendarResponse.data.conferenceData.entryPoints[0].uri;
    return meetLink;
  } catch (error) {
    console.error('Error creating Google Meet link:', error.message);
    throw error;
  }
}

module.exports = { createMeetLink };
