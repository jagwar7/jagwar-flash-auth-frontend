'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useMemo, useCallback, useReducer } from 'react';
import { reducer } from './reducer';


export const AlertContext = createContext<AuthContextType | undefined>(undefined);


export function AlertStateProvider({children}:{children: ReactNode}){

  const [activeAlert, setActiveAlert] = useState(false);
  const [alertData, setAlertData] = useState('');
  const [isPositive, setIsPositive] = useState(false);

    const [state, setState] = useReducer(reducer)

  return <AlertContext.Provider value={value}>
    {children}
  </AlertContext.Provider>

}