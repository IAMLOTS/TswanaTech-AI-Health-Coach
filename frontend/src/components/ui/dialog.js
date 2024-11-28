// src/components/ui/dialog.js
import React from 'react';

export const Dialog = ({ open, children, onOpenChange }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <button onClick={() => onOpenChange(false)}>Close</button>
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children }) => <div>{children}</div>;

export const DialogHeader = ({ children }) => <div className="text-xl font-bold">{children}</div>;

export const DialogTitle = ({ children }) => <h2>{children}</h2>;

export const DialogDescription = ({ children }) => <p>{children}</p>;
