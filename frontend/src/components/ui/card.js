import React from 'react';

export const Card = ({ children, className }) => (
  <div className={`p-4 bg-white rounded-lg shadow ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="border-b pb-2 mb-2">
    {children}
  </div>
);

export const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-bold ${className}`}>{children}</h2>
);

export const CardContent = ({ children }) => (
  <div className="p-2">{children}</div>
);
