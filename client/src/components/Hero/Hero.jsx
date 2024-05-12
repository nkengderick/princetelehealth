import React, { useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './hero.css'; // Import your CSS file

import logo from '../../assets/logo.jpeg';
import illustration1 from '../../assets/illustration1.jpeg';
import illustration2 from '../../assets/illustration2.jpeg';
import illustration3 from '../../assets/illustration3.jpeg';

const HeroSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { imagePath: illustration1, text: "Connect with healthcare professionals online." },
    { imagePath: illustration2, text: "Schedule appointments from the comfort of your home." },
    { imagePath: illustration3, text: "Get personalized care from experienced doctors." },
  ];

  const settings = {
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    afterChange: (newIndex) => setCurrentImageIndex(newIndex),
  };

  return (
    <section className="hero-section">
      <header>
        <Link to='#'><img src={logo} alt="Your Logo" /></Link>
        <nav>
          <Link to="#how-it-works">How it Works</Link>
          <Link to="#features">Features</Link>
          <Link to="#about-us">About Us</Link>
          <Link to="#testimonials">Testimonials</Link>
          <Link to="/log-in" className="cta-button">Sign in</Link>
        </nav>
      </header>

      <div className="hero-content">
        <h1>Your Telemedicine Platform</h1>
        <p>Connect with healthcare professionals from the comfort of your home.</p>
        <Link to="/log-in" className="cta-button">Get Started</Link>
      </div>

      <div className="hero-images">
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image.imagePath}
                alt={`Illustration ${index + 1}`}
                className={`illustration-image ${index === currentImageIndex ? 'visible' : ''}`}
              />
              <p className='illustration-text'>{image.text}</p>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HeroSection;
