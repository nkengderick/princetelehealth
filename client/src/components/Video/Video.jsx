import './video.css';

import React, {useEffect} from 'react';

const Video = ({ videoLink }) => {
  useEffect(() => {

  }, [videoLink]);

  return (
    <div className="video-container">
      <h2>Video Consultation</h2>
      <div className="video-wrapper">
        <iframe
          title="Video Consultation"
          width="560"
          height="315"
          src={videoLink}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Video;
