import React from 'react';
import './notfound.css'; // Import the stylesheet

const NotFound = () => {
  return (
    <div className="container">
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1 className="error">404</h1>
          </div>
          <h2>Oops! Page Not Found</h2>
          <p>The page you are looking for might have been removed or its name changed or is temporarily unavailable.</p>
          <a href="/">Back to homepage</a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
