'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useMemo, useCallback, useReducer } from 'react';
import { reducer } from './reducer';


export const AlertContext = createContext<AuthContextType | undefined>(undefined);


export function AlertStateProvider({children}:{children: ReactNode}){
   const initialState ={
    user: null,
    uiData: null,
    emails: null
    }

  const [activeAlert, setActiveAlert] = useState(false);
  const [alertData, setAlertData] = useState('');
  const [isPositive, setIsPositive] = useState(false);

    const [state, dispatch] = useReducer(reducer, initialState);

  return <AlertContext.Provider value={{state, dispatch, activeAlert, alertData, isPositive, setActiveAlert, setA}}>
    {children}
  </AlertContext.Provider>

}