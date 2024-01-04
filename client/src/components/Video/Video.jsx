import './video.css'

// Video.js
import React, { useEffect } from 'react';

const Video = () => {
  useEffect(() => {
    // Load Google Meet API script
    const script = document.createElement('script');
    script.src = 'https://meet.google.com/scripts/external_api.js';
    script.async = true;
    script.onload = () => {
      // Initialize the Meet API
      const { Meet } = window;
      const videoCall = new Meet.GoogleMeet({
        apiKey: 'AIzaSyDqn3Ei-Hke6QAFg_8XZPEilhhjFxJHhog',
      });

      // Specify the container where the video call will be rendered
      const container = document.getElementById('meet-container');

      // Start the video call
      videoCall.render(container);
      videoCall.start();
    };

    document.body.appendChild(script);

    return () => {
      // Clean up when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  return <div id="meet-container" style={{ height: '500px' }} />;
};

export default Video;
