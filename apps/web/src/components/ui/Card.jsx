import React from 'react';

export function Card({ 
  children, 
  variant = 'default',
  className = '', 
  ...props 
}) {
  const variants = {
    default: "bg-surface-container-lowest border-2 border-primary",
    highlight: "bg-secondary-container border-3 border-primary",
    hero: "bg-surface-container-lowest border-4 border-primary neo-shadow-lg"
  };

  return (
    <div 
      className={`rounded-xl neo-shadow overflow-hidden ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div className={`p-6 border-b-2 border-primary ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
}
