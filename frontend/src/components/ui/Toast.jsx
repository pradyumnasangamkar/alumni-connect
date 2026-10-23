// src/components/ui/Toast.jsx
import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const { message, type = 'success' } = toast;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-[#43D9A3] shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-[#FF7185] shrink-0" />,
    info: <Info className="w-4 h-4 text-[#55D6E8] shrink-0" />,
  };

  const borders = {
    success: 'border-[#43D9A3]/40 bg-[#151E33]',
    error: 'border-[#FF7185]/40 bg-[#151E33]',
    info: 'border-[#55D6E8]/40 bg-[#151E33]',
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-3.5 rounded-xl border shadow-2xl max-w-sm animate-in fade-in slide-in-from-bottom-5">
      <div className={`flex items-center gap-2.5 ${borders[type] || borders.success}`}>
        {icons[type] || icons.success}
        <span className="text-xs font-medium text-[#F3F5FC]">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-[#7F8BA3] hover:text-[#F3F5FC] p-1 cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
