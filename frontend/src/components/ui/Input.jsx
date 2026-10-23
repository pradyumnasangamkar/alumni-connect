// src/components/ui/Input.jsx
import React from 'react';

/**
 * Reusable Input component with dark-mode styling, labels, and error messages.
 */
export const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  rightElement,
  className = '',
  id,
  type = 'text',
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full text-left space-y-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-[#A7B2C8]"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-[#7F8BA3] pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        <input
          id={inputId}
          type={type}
          className={`
            w-full bg-[#10172A] border text-sm text-[#F3F5FC] rounded-lg 
            placeholder-[#7F8BA3] transition-all duration-150 outline-none
            ${Icon ? 'pl-9' : 'pl-3.5'}
            ${rightElement ? 'pr-10' : 'pr-3.5'}
            py-2.5
            ${error 
              ? 'border-[#FF7185] focus:ring-1 focus:ring-[#FF7185]' 
              : 'border-[#26334B] hover:border-[#3B4D6E] focus:border-[#8B7CFF] focus:ring-1 focus:ring-[#8B7CFF]'
            }
            ${className}
          `}
          {...props}
        />

        {rightElement && (
          <div className="absolute right-3 flex items-center">
            {rightElement}
          </div>
        )}
      </div>

      {error ? (
        <p className="text-xs text-[#FF7185] mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-[#7F8BA3] mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
