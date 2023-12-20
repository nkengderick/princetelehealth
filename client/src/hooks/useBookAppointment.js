import { useState } from 'react';
import axios from 'axios';
import { useAppointmentContext } from './useAppointmentContext';

export const useBookAppointment = () => {
  const { dispatch } = useAppointmentContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const bookAppointment = async (doctorId, patientId, date, time, location) => {
    setIsLoading(true);
    setError(null);

    try {
      // Make an API call to book the appointment
      const response = await axios.post('http://localhost:5000/appointment/create', { doctorId, patientId, date, time, location });

      const bookedAppointment = response.data;

      if (response.status === 201) {
        // Dispatch the BOOK_APPOINTMENT action
        dispatch({ type: 'BOOK_APPOINTMENT', payload: bookedAppointment });
      } else {
        setError('Appointment booking failed');
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Internal Server Error');
    }
  };

  return { bookAppointment, isLoading, error };
};
