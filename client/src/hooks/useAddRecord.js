import { useState } from 'react';
import axios from 'axios';
import { useRecordContext } from './useRecordContext';

export const useAddRecord = () => {
  const { dispatch } = useRecordContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const addRecord = async (doctor, name, phone, dob, address, gender, signsAndSymptoms, recommendations, nextSteps) => { 
    setIsLoading(true);
    setError(null);

    try {
      // Make an API call to add the record
      const response = await axios.post('http://localhost:5000/record/create', { doctor, name, phone, dob, address, gender, signsAndSymptoms, recommendations, nextSteps });

      const addedRecord = response.data;

      if (response.status === 201) {
        // Dispatch the ADD_RECORD action
        dispatch({ type: 'ADD_RECORD', payload: addedRecord });
      } else {
        setError('Record adding failed');
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError('Internal Server Error');
    }
  };

  return { addRecord, isLoading, error };
};
