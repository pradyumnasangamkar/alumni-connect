// src/components/ui/Button.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button component for Alumni Connect.
 * Uses Tailwind CSS utility classes and adheres to the Obsidian & Electric Iris design tokens.
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2 gap-2",
    lg: "text-base px-6 py-2.5 gap-2.5",
  };

  const variantStyles = {
    // Electric Iris gradient with soft glow on hover
    primary: "bg-gradient-to-r from-[#8B7CFF] to-[#7A69FA] text-white hover:brightness-110 shadow-[0_0_15px_rgba(139,124,255,0.25)] border border-[#8B7CFF]/30",
    
    // Elevated secondary slate button
    secondary: "bg-[#151E33] hover:bg-[#1C2742] text-[#F3F5FC] border border-[#26334B] hover:border-[#8B7CFF]/40",
    
    // Outline border
    outline: "bg-transparent hover:bg-[#151E33] text-[#A7B2C8] hover:text-[#F3F5FC] border border-[#26334B] hover:border-[#8B7CFF]",
    
    // Coral error/danger button
    danger: "bg-[#FF7185]/10 hover:bg-[#FF7185]/20 text-[#FF7185] border border-[#FF7185]/30",
    
    // Ghost button with no border
    ghost: "bg-transparent hover:bg-[#151E33] text-[#A7B2C8] hover:text-[#F3F5FC]",
    
    // Cyan accent button
    cyan: "bg-[#55D6E8]/10 hover:bg-[#55D6E8]/20 text-[#55D6E8] border border-[#55D6E8]/30",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin text-current" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && <Icon className="w-4 h-4 shrink-0" />}
          {children}
        </>
      )}
    </button>
  );
};
