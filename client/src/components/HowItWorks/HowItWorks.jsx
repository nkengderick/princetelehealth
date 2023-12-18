import './howitworks.css'
import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaSearch, FaCalendarAlt, FaVideo } from 'react-icons/fa';

const HowItWorks = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    {
      title: 'Step 1',
      description: 'Sign Up for an Account',
      icon: <FaUserPlus size={50} />, 
    },
    {
      title: 'Step 2',
      description: 'Find a Doctor',
      icon: <FaSearch size={50} />,
    },
    {
      title: 'Step 3',
      description: 'Book an Appointment',
      icon: <FaCalendarAlt size={50} />, 
    },
    {
      title: 'Step 4',
      description: 'Join the Online Consultation',
      icon: <FaVideo size={50} />, 
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentStepIndex((prevIndex) => (prevIndex + 1) % steps.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [steps.length]);


  return (
    <section className="how-it-works">
      <h2>How it Works</h2>
      <div className="steps-container">
      {steps.slice(0, currentStepIndex + 1).map((step, index) => (
          <div key={index} className="step">
            <div className="icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
