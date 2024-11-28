import React from 'react';
import { motion } from 'framer-motion';

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative inline-block">
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-2 text-sm bg-gray-800 text-white rounded-md opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
      >
        {text}
      </motion.div>
      <div className="group inline-block">{children}</div>
    </div>
  );
};

export default Tooltip;
