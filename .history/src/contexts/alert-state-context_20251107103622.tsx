'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useMemo, useCallback } from 'react';


export const AlertContext = createContext<AuthContextType | undefined>(undefined);


export function AlertStateProvider({children}:{children: ReactNode}){

  const [activeAlert, setActiveAlert] = useState(false);
  const [alertData, setAlertData] = useState('');
  const [isPositive, setIsPositive] = useState(false);

  return <AlertContext.Provider value={value}

}