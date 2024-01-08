import React, { createContext, useEffect, useReducer  } from 'react'; 
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

export const RecordContext = createContext();

export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECORDS': 
    return {
      records: action.payload
    }
    case 'SET_USER_RECORDS': 
    return {
      ...state,
      userRecords: action.payload
    }
    case 'ADD_RECORD':
      return {
        ...state,
        records: [...state.records, action.payload]
      }
      default:
        return state;
      }
}

export function RecordContextProvider({ children }) {

  const { user } = useAuthContext()
  const [state, dispatch] = useReducer(dataReducer, {
    records: []
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://prince-tele-health-api.onrender.com/record/all');
        const records = await response.data;
        dispatch({ type: 'SET_RECORDS', payload: records });      
        
        const userRecords = state.records.filter(
          record => record.patientId === user._id
          )
        dispatch({ type: 'SET_USER_RECORDS', payload: userRecords });      
          
    
    } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);
 
  return (
    <RecordContext.Provider value={{...state, dispatch}}> 
      {children}
    </RecordContext.Provider>
  );
}
