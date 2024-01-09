import { useState } from 'react';
import axios from 'axios';
import { useAppointmentContext } from './useAppointmentContext';

export const useBookAppointment = () => {
  const { dispatch } = useAppointmentContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const bookAppointment = async (doctorId, patientId, date, time, location, status) => {
    setIsLoading(true);
    setError(null);

    try {
      // Make an API call to book the appointment
      const response = await axios.post('https://prince-tele-health-api.onrender.com/appointment/create', { doctorId, patientId, date, time, location, status });

      const bookedAppointment = response.data;

      if (response.status === 201) {
        // Dispatch the BOOK_APPOINTMENT action
        dispatch({ type: 'BOOK_APPOINTMENT', payload: bookedAppointment });
        setMessage('Appointment booked Succesfully')
      } else {
        setMessage('Appointment booking failed');
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Internal Server Error Please rebook your appointment. Sorry for the invconveniences, our serevr is still under development');
    }
  };

  return { bookAppointment, isLoading, error, message };
};
