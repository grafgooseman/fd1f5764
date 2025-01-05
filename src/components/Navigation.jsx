import React from 'react';
import { PhoneIcon, ArchiveBoxIcon, ClockIcon } from '@heroicons/react/24/outline';

const Navigation = ({ currentView, setCurrentView }) => {
  return (
    <nav className="bg-theme-light-bg-primary dark:bg-theme-dark-bg-primary border-t border-theme-light-border-primary dark:border-theme-dark-border-primary sticky bottom-0">
      <div className="flex justify-around py-5">
        <button 
          onClick={() => setCurrentView('calls')}
          className={`flex flex-col items-center space-y-1 ${
            currentView === 'calls' 
              ? 'text-primary' 
              : 'text-theme-light-text-tertiary dark:text-theme-dark-text-tertiary hover:text-primary'
          } transition-colors`}
        >
          <PhoneIcon className="h-6 w-6" />
          {/* <span className="text-xs">Calls</span> */}
        </button>
        <button 
          onClick={() => setCurrentView('archive')}
          className={`flex flex-col items-center space-y-1 ${
            currentView === 'archive' 
              ? 'text-primary' 
              : 'text-theme-light-text-tertiary dark:text-theme-dark-text-tertiary hover:text-primary'
          } transition-colors`}
        >
          <ArchiveBoxIcon className="h-6 w-6" />
          {/* <span className="text-xs">Archive</span> */}
        </button>
        <button 
          onClick={() => setCurrentView('all')}
          className={`flex flex-col items-center space-y-1 ${
            currentView === 'all' 
              ? 'text-primary' 
              : 'text-theme-light-text-tertiary dark:text-theme-dark-text-tertiary hover:text-primary'
          } transition-colors`}
        >
          <ClockIcon className="h-6 w-6" />
          {/* <span className="text-xs">All calls</span> */}
        </button>
      </div>
    </nav>
  );
};

export default Navigation; 