import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import { AuthContextProvider } from './contexts/AuthContext';
import { UserContextProvider } from './contexts/UserContext';
import { AppointmentContextProvider } from './contexts/AppointmentContext';
import { RecordContextProvider } from './contexts/RecordContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <AppointmentContextProvider>
          <RecordContextProvider>
            <App />
          </RecordContextProvider>
        </AppointmentContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

