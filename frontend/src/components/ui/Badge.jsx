// src/components/ui/Badge.jsx
import React from 'react';

/**
 * Reusable Badge component for roles, tags, status pills, and employment types.
 */
export const Badge = ({
  children,
  variant = 'iris',
  size = 'md',
  className = '',
  icon: Icon,
}) => {
  const variantStyles = {
    iris: "bg-[#8B7CFF]/15 text-[#8B7CFF] border-[#8B7CFF]/30",
    cyan: "bg-[#55D6E8]/15 text-[#55D6E8] border-[#55D6E8]/30",
    success: "bg-[#43D9A3]/15 text-[#43D9A3] border-[#43D9A3]/30",
    warning: "bg-[#F5C76A]/15 text-[#F5C76A] border-[#F5C76A]/30",
    error: "bg-[#FF7185]/15 text-[#FF7185] border-[#FF7185]/30",
    neutral: "bg-[#26334B]/50 text-[#A7B2C8] border-[#26334B]",
  };

  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 gap-1",
    md: "text-xs px-2.5 py-1 gap-1.5",
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full border
        ${variantStyles[variant] || variantStyles.iris}
        ${sizeStyles[size] || sizeStyles.md}
        ${className}
      `}
    >
      {Icon && <Icon className="w-3 h-3 shrink-0" />}
      {children}
    </span>
  );
};
