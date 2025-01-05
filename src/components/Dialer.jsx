import React from 'react';
import { PhoneIcon, BackspaceIcon } from '@heroicons/react/24/outline';

const DialerButton = ({ children, className = '' }) => (
  <button className={`
    w-20 h-16 rounded-full 
    flex items-center justify-center
    text-2xl font-medium
    bg-theme-light-bg-secondary dark:bg-theme-dark-bg-secondary
    text-theme-light-text-primary dark:text-theme-dark-text-primary
    hover:bg-theme-light-bg-tertiary dark:hover:bg-theme-dark-bg-tertiary
    transition-colors
    ${className}
  `}>
    {children}
  </button>
);

const Dialer = () => {
  return (
    <div className="p-8 flex flex-col items-center h-full">
      <div className="w-full max-w-md space-y-6">
        {/* Phone number display */}
        <input
          type="tel"
          placeholder="Enter phone number"
          className="w-full px-4 py-3 text-2xl text-center 
            bg-theme-light-bg-primary dark:bg-theme-dark-bg-primary
            text-theme-light-text-primary dark:text-theme-dark-text-primary
            border border-theme-light-border-primary dark:border-theme-dark-border-primary
            rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          readOnly
        />
        
        {/* Keypad */}
        <div className="grid grid-cols-3 gap-2 justify-items-center">
          <DialerButton>1</DialerButton>
          <DialerButton>2</DialerButton>
          <DialerButton>3</DialerButton>
          <DialerButton>4</DialerButton>
          <DialerButton>5</DialerButton>
          <DialerButton>6</DialerButton>
          <DialerButton>7</DialerButton>
          <DialerButton>8</DialerButton>
          <DialerButton>9</DialerButton>
          <DialerButton>*</DialerButton>
          <DialerButton>0</DialerButton>
          <DialerButton>#</DialerButton>
        </div>

        {/* Action buttons */}
        <div className="relative h-14">
          {/* Delete button - positioned left */}
          <button className="absolute left-5 
            w-20 h-16 rounded-full 
            flex items-center justify-center
            bg-theme-light-bg-secondary dark:bg-theme-dark-bg-secondary
            text-theme-light-text-primary dark:text-theme-dark-text-primary
            hover:bg-theme-light-bg-tertiary dark:hover:bg-theme-dark-bg-tertiary
            transition-colors">
            <BackspaceIcon className="h-6 w-6" />
          </button>
          
          {/* Call button - centered */}
          <button className="absolute left-1/2 -translate-x-1/2
            w-16 h-16 rounded-full 
            flex items-center justify-center
            bg-primary hover:bg-primary-dark
            transition-colors">
            <PhoneIcon className="h-7 w-7 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialer; 