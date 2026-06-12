import React from 'react';

export function Badge({ 
  children, 
  variant = 'default',
  scene,
  className = '', 
  ...props 
}) {
  const variants = {
    default: "bg-primary text-on-primary",
    highlight: "bg-secondary text-on-secondary-container border border-primary",
    outline: "bg-transparent text-primary border border-primary",
    pill: "bg-primary text-on-primary rounded-full px-4 py-1"
  };

  // Map scenes to Tailwind theme colors
  const sceneColors = {
    techno: "bg-[#6D28D9] text-white",
    bollywood: "bg-[#DC2626] text-white",
    garba: "bg-[#D97706] text-white",
    campus: "bg-[#2563EB] text-white",
    comedy: "bg-[#059669] text-white",
    startup: "bg-[#0891B2] text-white"
  };

  const sceneStyle = scene ? sceneColors[scene.toLowerCase()] : '';
  const selectedVariant = sceneStyle ? sceneStyle : variants[variant];

  return (
    <span 
      className={`
        inline-flex items-center justify-center 
        px-2.5 py-1 text-xs font-bold uppercase tracking-wide
        ${variant !== 'pill' ? 'rounded-sm' : ''}
        ${selectedVariant}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}
