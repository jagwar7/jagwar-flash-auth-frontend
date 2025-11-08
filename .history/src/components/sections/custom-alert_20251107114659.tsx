// src/components/sections/custom-alert.tsx
import { CheckCircle, AlertCircle } from 'lucide-react';

interface CustomAlertProps {
  alert: { message: string; isPositive: boolean } | null;
}

export function CustomAlert({ alert }: CustomAlertProps) {
  if (!alert) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm animate-in slide-in-from-bottom fade-in duration-300">
      <div
        className={`
          flex items-center gap-3 p-4 rounded-lg shadow-xl border
          ${alert.isPositive 
            ? 'bg-green-50 border-green-500 text-green-800' 
            : 'bg-red-50 border-red-500 text-red-800'
          }
        `}
      >
        {alert.isPositive ? (
          <CheckCircle className="h-6 w-6 text-green-600" />
        ) : (
          <AlertCircle className="h-6 w-6 text-green-600" />
        )}
        <p className="font-medium text-sm">{alert.message}</p>
      </div>
    </div>
  );
}