import React, { createContext, useEffect, useReducer  } from 'react'; 
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

export const AppointmentContext = createContext();

export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APPOINTMENTS': 
    return {
      appointments: action.payload
    }
    case 'SET_USER_APPOINTMENTS': 
    return {
      ...state,
      userAppointments: action.payload
    }
    case 'BOOK_APPOINTMENTS':
      return {
        ...state,
        appointments: [...state.appointments, action.payload]
      }
      default:
        return state;
      }
}

export function AppointmentContextProvider({ children }) {

  const { user } = useAuthContext()
  const [state, dispatch] = useReducer(dataReducer, {
    appointments: null
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/appointment/all');
        const appointments = await response.data;
        dispatch({ type: 'SET_APPOINTMENTS', payload: appointments });      
        
        const userAppointments = state.appointments.filter(
          appointment => appointment.patientId === user._id || appointment.doctorId === user._id
          )
        dispatch({ type: 'SET_USER_APPOINTMENTS', payload: userAppointments });      
          
    
    } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
 
  return (
    <AppointmentContext.Provider value={{...state, dispatch}}> 
      {children}
    </AppointmentContext.Provider>
  );
}
