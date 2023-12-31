import { useState } from 'react';
import axios from 'axios';
import { useAppointmentContext } from './useAppointmentContext';

export const useUpdateAppointment = () => {
    const { dispatch } = useAppointmentContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const updateAppointment = async (appointmentId, updatedFields) => {
      setIsLoading(true);
      setError(null);
  
      try {
        // Make an API call to update the appointment
        const response = await axios.put(`https://prince-tele-health-api.onrender.com/appointment/update/${appointmentId}`, updatedFields);
  
        const updatedAppointment = response.data;
  
        if (response.status === 200) {
          // Dispatch the UPDATE_APPOINTMENT action
          dispatch({ type: 'UPDATE_APPOINTMENT', payload: updatedAppointment });
        } else {
          setError('Appointment update failed');
        }
  
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError('Internal Server Error');
      }
    };
  
    return { updateAppointment, isLoading, error };
  };
  