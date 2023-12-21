import { useState } from 'react';
import axios from 'axios';
import { useUserContext } from './useUserContext';

export const useUpdateUser = () => {
    const { dispatch } = useUserContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const updateUser = async (userId, updatedFields) => {
      setIsLoading(true);
      setError(null);
  
      try {
        // Make an API call to update the user
        const response = await axios.put(`http://localhost:5000/user/update/${userId}`, updatedFields);
  
        const updatedUser = response.data;
  
        if (response.status === 200) {
          // Dispatch the UPDATE_USER action
          dispatch({ type: 'UPDATE_USER', payload: updatedUser });
        } else {
          setError('User update failed');
        }
  
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError('Internal Server Error');
      }
    };
  
    return { updateUser, isLoading, error };
  };
  