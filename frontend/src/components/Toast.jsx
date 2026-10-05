import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  useEffect(() => {
    if (toasts.length === 0) return;

    const timer = setTimeout(() => {
      onDismiss(toasts[0].id);
    }, 4000);

    return () => clearTimeout(timer);
  }, [toasts, onDismiss]);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        let icon = <Info size={18} />;
        let typeClass = 'toast-info';

        if (toast.type === 'success') {
          icon = <CheckCircle2 size={18} />;
          typeClass = 'toast-success';
        } else if (toast.type === 'error') {
          icon = <AlertCircle size={18} />;
          typeClass = 'toast-error';
        }

        return (
          <div key={toast.id} className={`toast ${typeClass}`}>
            {icon}
            <span>{toast.message}</span>
            <button
              className="toast-close"
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss toast"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
