import './landing.css'

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HowItWorks from '../../components/HowItWorks/HowItWorks';
import KeyFeaturesSection from '../../components/Features/Features';
import TestimonialsSection from '../../components/Testimonials/Testimonials';
import AboutSection from '../../components/About Us/About';
import ContactUs from '../../components/Contact/Contact';
import HeroSection from '../../components/Hero/Hero';

const LandingPage = () => {

    return (
    <div className="landing-page">

      <section className="section-card hero">
        <HeroSection />
      </section>

      <section className="section-card how-it-works" id='how-it-works'>
        <HowItWorks />
      </section>

      <section className="section-card key-features" id='features'>
        <KeyFeaturesSection />
      </section>

      <section className="section-card testimonials" id='testimonials'>
        <TestimonialsSection />
      </section>

      <section className="section-card about-us" id='about-us'>
          <AboutSection />
      </section>

      <section className="section-card get-started">
        <h2>Get Started</h2>
        <Link to="/sign-up" className="cta-button">Get Started</Link>
      </section>

      <section className="section-card contact">
        <ContactUs />
      </section>

      <footer>
        <nav>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </nav>
        <p>&copy; 2023 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
