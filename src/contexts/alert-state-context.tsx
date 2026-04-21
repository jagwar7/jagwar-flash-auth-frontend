// src/context/AlertContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CustomAlert } from '@/components/sections/custom-alert';

interface Alert {
  message: string;
  isPositive: boolean; // ← true = success, false = error
}

interface AlertContextValue {
  showAlert: (message: string, isPositive?: boolean) => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = (message: string, isPositive = true) => {
    message.toUpperCase();
    setAlert({ message, isPositive });
    setTimeout(() => setAlert(null), 4000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <CustomAlert alert={alert} />
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const alertContext = useContext(AlertContext);
  if (!alertContext) throw new Error('useAlert must be used within AlertProvider');
  return alertContext;
};