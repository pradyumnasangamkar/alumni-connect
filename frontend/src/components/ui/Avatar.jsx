// src/components/ui/Avatar.jsx
import React, { useState } from 'react';

/**
 * Avatar component with automatic initials fallback and online status indicator.
 */
export const Avatar = ({
  src,
  alt = '',
  name = '',
  size = 'md',
  className = '',
  isOnline,
}) => {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  };

  const getInitials = (str) => {
    if (!str) return 'U';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  return (
    <div className={`relative inline-block shrink-0 ${className}`}>
      <div
        className={`
          ${sizeClasses[size] || sizeClasses.md}
          rounded-full overflow-hidden flex items-center justify-center
          bg-[#1C2742] border border-[#26334B] text-[#8B7CFF] font-semibold
        `}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt || name}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name || alt)}</span>
        )}
      </div>

      {isOnline !== undefined && (
        <span
          className={`
            absolute bottom-0 right-0 block rounded-full ring-2 ring-[#0B1020]
            ${size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5'}
            ${isOnline ? 'bg-[#43D9A3]' : 'bg-[#7F8BA3]'}
          `}
        />
      )}
    </div>
  );
};
