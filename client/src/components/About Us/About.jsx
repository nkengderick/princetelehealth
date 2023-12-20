import React from 'react';

import me from '../../assets/illustration2.jpeg'
import './about.css'; // Import your CSS file

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <h2>About Us</h2>
        <div className="mission-vision-section">
          <div className="mission-vision">
            <h3>Mission Statement</h3>
            <p>
              To empower rural communities by providing accessible and quality healthcare services, fostering health education, and promoting community well-being.
            </p>
          </div>
          <div className="mission-vision">
            <h3>Vision Statement</h3>
            <p>
              A future where every individual, regardless of their location, has seamless access to healthcare, and where the intersection of medical expertise and agricultural solutions contributes to holistic community development.
            </p>
          </div>
        </div>
        <div className="about-me-details">
            <div className="about-image">
                <img src='https://github.com/nkengderick/images/telemedicine/ashley.jpg' alt="About Us" />
            </div>
            <div className='about-desc'>
              <p>Ngono Prince</p>
              <p>Level 300 student at FET UB</p>
              <p>Medical Practitioner and Farming Solutions</p>
            </div>
        </div>
        <p>
          As a student passionate about medical and farming solutions, I embarked on a journey to address a pressing issue in our communities — the lack of accessible healthcare services in rural areas.
        </p>
        <p>
          The idea for this platform emerged from my aspirations and the desire to make a positive impact. The goal is to bridge the gap between villagers and healthcare professionals, ensuring that everyone, regardless of their location, has access to quality healthcare.
        </p>
        <p>
          Our mission goes beyond connecting patients with doctors; it extends to fostering a sense of community, promoting health education, and empowering individuals to take control of their well-being.
        </p>
        <p>
          With a focus on innovation and community-driven solutions, we strive to create a platform that not only solves a problem but also cultivates lasting improvements in the lives of those we serve.
        </p>
        <p>
          Join us on this journey as we work towards a future where healthcare is accessible to all, and where the intersection of medical expertise and agricultural solutions contributes to the holistic well-being of our communities.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
