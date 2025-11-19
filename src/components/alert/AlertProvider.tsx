'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface Alert {
  id: string;
  type: AlertType;
  message: string;
}

interface AlertContextType {
  showAlert: (type: AlertType, message: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within AlertProvider');
  return context;
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = (type: AlertType, message: string) => {
    const id = crypto.randomUUID();
    setAlerts((prev) => [...prev, { id, type, message }]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, 4000);
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const colors: Record<AlertType, string> = {
    success: 'bg-green-600 border-green-500 text-white',
    error: 'bg-red-600 border-red-500 text-white',
    warning: 'bg-yellow-500 border-yellow-400 text-black',
    info: 'bg-blue-600 border-blue-500 text-white',
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {/* Alert List */}
      <div className='fixed top-4 left-1/2 z-[9999] -translate-x-1/2 space-y-3 w-full max-w-md px-4'>
        <AnimatePresence>
          {alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className={`rounded-xl border shadow-lg px-4 py-3 flex items-center justify-between ${
                colors[alert.type]
              }`}
            >
              <p className='text-sm font-medium'>{alert.message}</p>

              <button
                onClick={() => removeAlert(alert.id)}
                className='ml-4 hover:opacity-80'
              >
                <X size={18} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AlertContext.Provider>
  );
};
