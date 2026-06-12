import React from 'react';

export function Button({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) {
  const baseStyles = "font-display font-bold uppercase px-6 py-3 rounded text-center transition-all neo-button-press";
  
  const variants = {
    primary: "bg-secondary-container text-primary border-2 border-primary neo-shadow",
    secondary: "bg-surface-container-lowest text-primary border-2 border-primary hover:neo-shadow",
    outline: "bg-transparent text-primary border-2 border-primary hover:bg-secondary-container",
    ghost: "bg-transparent text-primary hover:bg-surface-container-low"
  };

  const selectedVariant = variants[variant] || variants.primary;

  return (
    <button 
      className={`${baseStyles} ${selectedVariant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
