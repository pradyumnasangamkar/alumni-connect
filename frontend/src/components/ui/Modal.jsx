// src/components/ui/Modal.jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Accessible Modal dialog for forms, profile details, and confirmations.
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'max-w-lg',
}) => {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0B1020]/80 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Surface */}
      <div
        className={`
          relative w-full ${maxWidth} bg-[#151E33] border border-[#26334B] 
          rounded-2xl shadow-2xl p-6 sm:p-7 z-10 my-8 text-left
          transform transition-all duration-200 animate-in fade-in zoom-in-95
        `}
      >
        <div className="flex items-start justify-between pb-4 border-b border-[#26334B]">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-[#F3F5FC]">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs text-[#A7B2C8] mt-1">
                {description}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#7F8BA3] hover:text-[#F3F5FC] hover:bg-[#1C2742] rounded-lg transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="mt-5">
          {children}
        </div>
      </div>
    </div>
  );
};
