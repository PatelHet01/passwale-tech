import React, { forwardRef } from 'react';

export const Input = forwardRef(({ className = '', variant = 'default', ...props }, ref) => {
  const variants = {
    default: "bg-surface-container-lowest",
    highlight: "bg-secondary"
  };

  return (
    <input
      ref={ref}
      className={`
        w-full px-4 py-3 rounded border-2 border-primary
        font-body font-bold text-primary 
        placeholder:text-primary/50 placeholder:font-normal
        focus:outline-none focus:border-3 focus:neo-shadow-sm
        transition-all
        ${variants[variant]}
        ${className}
      `}
      {...props}
    />
  );
});

Input.displayName = 'Input';
