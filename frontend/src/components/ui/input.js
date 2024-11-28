// src/components/ui/input.js
import React from 'react';

export const Input = ({ name, value, onChange, placeholder, type = 'text' }) => (
  <input
    name={name}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    type={type}
    className="border p-2 rounded-md w-full"
  />
);
