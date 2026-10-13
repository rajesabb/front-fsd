import { createContext, useCallback, useContext, useReducer } from 'react';
import { api } from '../api';

// Global state shared by all pages: the patient list and the alert list.
const initialState = { patients: [], alerts: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PATIENTS':
      return { ...state, patients: action.payload };
    case 'SET_ALERTS':
      return { ...state, alerts: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadPatients = useCallback(async () => {
    const res = await api.get('/patients');
    dispatch({ type: 'SET_PATIENTS', payload: res.data });
  }, []);

  const loadAlerts = useCallback(async () => {
    const res = await api.get('/alerts');
    dispatch({ type: 'SET_ALERTS', payload: res.data });
  }, []);

  return (
    <AppContext.Provider value={{ ...state, loadPatients, loadAlerts }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
