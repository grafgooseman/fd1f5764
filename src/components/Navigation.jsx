import React from 'react';
import { PhoneIcon, ArchiveBoxIcon, ClockIcon, UserIcon, PhoneArrowUpRightIcon } from '@heroicons/react/24/outline';

const Navigation = ({ currentView, setCurrentView }) => {
  return (
    <nav className="bg-theme-light-bg-primary dark:bg-theme-dark-bg-primary border-t border-theme-light-border-primary dark:border-theme-dark-border-primary sticky bottom-0">
      <div className="flex justify-around items-center py-2 relative">
        <button 
          onClick={() => setCurrentView('calls')}
          className={`flex flex-col items-center space-y-1 ${
            currentView === 'calls' 
              ? 'text-primary' 
              : 'text-theme-light-text-tertiary dark:text-theme-dark-text-tertiary hover:text-primary'
          } transition-colors`}
        >
          <PhoneIcon className="h-7 w-7" />
        </button>

        <button 
          onClick={() => setCurrentView('all')}
          className={`flex flex-col items-center space-y-1 ${
            currentView === 'all' 
              ? 'text-primary' 
              : 'text-theme-light-text-tertiary dark:text-theme-dark-text-tertiary hover:text-primary'
          } transition-colors`}
        >
          <ClockIcon className="h-7 w-7" />
        </button>

        <button 
          onClick={() => setCurrentView('dialer')}
          className={`flex items-center justify-center 
            w-12 h-12 rounded-full border-2 
            ${currentView === 'dialer'
              ? 'border-primary text-primary bg-primary bg-opacity-10'
              : 'border-theme-light-text-tertiary dark:border-theme-dark-text-tertiary text-theme-light-text-tertiary dark:text-theme-dark-text-tertiary hover:text-primary hover:border-primary'
            } transition-all -translate-y-1`}
        >
          <PhoneArrowUpRightIcon className="h-7 w-7" />
        </button>

        <button 
          onClick={() => setCurrentView('archive')}
          className={`flex flex-col items-center space-y-1 ${
            currentView === 'archive' 
              ? 'text-primary' 
              : 'text-theme-light-text-tertiary dark:text-theme-dark-text-tertiary hover:text-primary'
          } transition-colors`}
        >
          <ArchiveBoxIcon className="h-7 w-7" />
        </button>

        <button 
          onClick={() => setCurrentView('profile')}
          className={`flex flex-col items-center space-y-1 ${
            currentView === 'profile' 
              ? 'text-primary' 
              : 'text-theme-light-text-tertiary dark:text-theme-dark-text-tertiary hover:text-primary'
          } transition-colors`}
        >
          <UserIcon className="h-7 w-7" />
        </button>
      </div>
    </nav>
  );
};

export default Navigation; 