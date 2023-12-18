import {createContext, useEffect, useReducer, useRef, useCallback} from 'react'

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const idleTimeout = 60 * 60 * 1000
    const [state, dispatch] = useReducer(authReducer , { user: null })

    const resetTimeout = useCallback(() => {
        const timeoutId = setTimeout(() => {
          // Automatically logout after idleTimeout
          dispatch({ type: 'LOGOUT' });
          localStorage.removeItem('user');
        }, idleTimeout);
    
        return timeoutId;
      }, [idleTimeout]);
      
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if(user) {
            dispatch({ type:'LOGIN', payload: user })
            
            const resetTimeoutOnActivity = () => {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = resetTimeout();
            }

            
            window.addEventListener('mousemove', resetTimeoutOnActivity);
            window.addEventListener('keydown', resetTimeoutOnActivity);
            
            return () => {
                window.addEventListener('mousemove', resetTimeoutOnActivity);
                window.addEventListener('keydown', resetTimeoutOnActivity);
            }
        }
    }, [resetTimeout])

    const timeoutRef = useRef(resetTimeout())

    return ( 
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}