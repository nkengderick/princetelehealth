
import React from 'react';
import './footer.css';
import { FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="Footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About PTH</h3>
          <p>PrinceTeleHealth is dedicated to providing high-quality healthcare services and health best education practices remotely.</p>
        </div>

        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>Email: ngonoprince742@gmail.com</p>
          <p>Phone: +237 6 70 95 19 34</p>
        </div>
        
        <div className="footer-section">
          <h3>Health Services</h3>
          <p>Professional Specialists</p>
          <p>Online consultation</p>
          <p>Live chat</p>
          <p>Health Records</p>
        </div>
        
        <div className="footer-section">
          <h3>Health Education</h3>
          <p>Nutrition</p>
          <p>Exercises</p>
          <p>Mental Health</p>
          <p>Preventive Care</p>
          <p>Common Illnesses</p>
          <p style={{color: 'red', fontWeight: 'bolder'}}>Fight Covid</p>
        </div>
        
        <div className="footer-section">
          <h3>Security</h3>
          <p>Encryption</p>
          <p>Privacy</p>
          <p>Secure data</p>
          <p>account management</p>
        </div>
        
        <div className="footer-section">
          <h3>Feedback and Surveys</h3>
          <p>Online surveys</p>
          <p>Onsite Questionares</p>
        </div>

        <div className="footer-section">
          <h4>Terms and conditions</h4>
          <p>Terms of use</p>
          <p>Privacy policy</p>
          <p>Refund policy</p>
          <p>Legal information</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Prince Tele Health <span className='strong'>PTH</span>. All rights reserved. Designed by Prince, Enzo and Derick</p>
      </div>
    </footer>
  );
};

export default Footer;
