// src/components/CustomAlert.tsx
import { AlertCircle, CheckCircle } from 'lucide-react';
import { Alert } from '@/components/ui/alert';

interface CustomAlertProps {
  alert: { message: string; type: 'success' | 'error' } | null;
}

export function CustomAlert({ alert }: CustomAlertProps) {
  if (!alert) return null;

  const isSuccess = alert.type === 'success';
  
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm animate-in slide-in-from-bottom fade-in duration-300">
      <Alert
        className={`border ${
          isSuccess ? 'border-green-500' : 'border-red-500'
        } shadow-lg`}
      >
        <div className="flex items-center gap-3">
          {isSuccess ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-600" />
          )}
          <p className={`font-medium ${isSuccess ? 'text-green-700' : 'text-red-700'}`}>
            {alert.message}
          </p>
        </div>
      </Alert>
    </div>
  );
}