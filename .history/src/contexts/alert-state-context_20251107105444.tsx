// src/context/AlertContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type AlertType = 'success' | 'error';

interface Alert {
  message: string;
  type: AlertType;
}

interface AlertContextValue {
  showAlert: (message: string, type?: AlertType) => void;
}

const AlertContext = createContext<AlertContextValue | undefined>(undefined);

export function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<Alert | null>(null);

  const showAlert = (message: string, type: AlertType = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000); // auto-hide after 4s
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <CustomAlert alert={alert} />
    </AlertContext.Provider>
  );
}

/* Hook to use anywhere */
export const useAlert = () => {
  const ctx = useContext(AlertContext);
  if (!ctx) throw new Error('useAlert must be used within AlertProvider');
  return ctx;
};