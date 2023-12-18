import React from 'react';
import { FaMobile, FaCalendarCheck, FaVideo, FaUserMd } from 'react-icons/fa';

import './features.css';

const KeyFeaturesSection = () => {
  const features = [
    {
      title: 'Mobile Access',
      description: 'Access the platform on the go with our mobile app.',
      icon: <FaMobile size={50} />,
    },
    {
      title: 'Easy Scheduling',
      description: 'Effortlessly schedule appointments at your convenience.',
      icon: <FaCalendarCheck size={50} />,
    },
    {
      title: 'Video Consultations',
      description: 'Connect with healthcare professionals through secure video consultations.',
      icon: <FaVideo size={50} />,
    },
    {
      title: 'Experienced Doctors',
      description: 'Choose from a network of experienced and qualified doctors.',
      icon: <FaUserMd size={50} />,
    },
  ];

  return (
    <section className="key-features-section">
      <h2>Key Features</h2>
      <div className="features-container">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default KeyFeaturesSection;
