import React from 'react';

export const Button = ({ children, variant, ...props }) => {
  const baseClass = 'px-4 py-2 font-medium text-white rounded';
  const variantClass = variant === 'outline' 
    ? 'border border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white' 
    : 'bg-blue-500 hover:bg-blue-600';

  return (
    <button className={`${baseClass} ${variantClass}`} {...props}>
      {children}
    </button>
  );
};
