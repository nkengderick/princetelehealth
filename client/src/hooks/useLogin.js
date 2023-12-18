import { useState } from 'react';
import { useAuthContext } from './useAuthContext';
import axios from 'axios';

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/user/login', {
        username,
        password,
      });

      const user = response.data;

      if (response.status !== 200) {
        setIsLoading(false);
        setError(user.error);
      }

      if (response.status === 200) {
        // Save the user to localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Dispatch LOGIN action after successful login
        dispatch({ type: 'LOGIN', payload: user });

        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError('Internal Server Error');
    }
  };

  return { login, isLoading, error };
};
