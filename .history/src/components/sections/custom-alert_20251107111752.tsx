// src/components/sections/custom-alert.tsx
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Alert } from '@/components/ui/alert';

interface CustomAlertProps {
  alert: { message: string; isPositive: boolean } | null;
}

export function CustomAlert({ alert }: CustomAlertProps) {
  if (!alert) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm animate-in slide-in-from-bottom fade-in duration-300">
      <Alert
        className={`border shadow-lg ${
          alert.isPositive ? 'border-green-500' : 'border-red-500'
        }`}
      >
        <div className="flex items-center gap-3">
          {alert.isPositive ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
          <p
            className={`font-medium ${
              alert.isPositive ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {alert.message}
          </p>
        </div>
      </Alert>
    </div>
  );
}