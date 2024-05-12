import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "./useAuthContext";
import { baseURL } from "../App";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (formData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${baseURL}/user/create`, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      );

      const user = response.data.user;
      console.log(user)

      if (!response.ok) {
        setIsLoading(false);
        setError(user.error);
      }

      if (response.ok) {
        // save the user to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'LOGIN', payload: user });

        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setIsLoading(false);
      setError('Internal Server Error');
    }
  };

  return { signup, isLoading, error };
};
