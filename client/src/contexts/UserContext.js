import React, { createContext, useEffect, useReducer  } from 'react'; 
import axios from 'axios';


export const UserContext = createContext();

export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS': 
      return {
        users: action.payload
      }
    default:
      return state;
  }
}

export function UserContextProvider({ children }) {

  const [state, dispatch] = useReducer(dataReducer, {
    users: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/all');
        const users = await response.data;
        dispatch({ type: 'SET_USERS', payload: users });      
    } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
 
  return (
    <UserContext.Provider value={{...state, dispatch}}> 
      {children}
    </UserContext.Provider>
  );
}
