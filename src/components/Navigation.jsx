import React from 'react';
import { PhoneIcon, ArchiveBoxIcon, ClockIcon } from '@heroicons/react/24/outline';

const Navigation = ({ currentView, setCurrentView }) => {
  return (
    <nav className="bg-white border-t border-gray-100 sticky bottom-0">
      <div className="flex justify-around py-3">
        <button 
          onClick={() => setCurrentView('calls')}
          className={`flex flex-col items-center space-y-1 ${
            currentView === 'calls' ? 'text-primary' : 'text-gray-400 hover:text-primary'
          } transition-colors`}
        >
          <PhoneIcon className="h-6 w-6" />
          <span className="text-xs">Calls</span>
        </button>
        <button 
          onClick={() => setCurrentView('archive')}
          className={`flex flex-col items-center space-y-1 ${
            currentView === 'archive' ? 'text-primary' : 'text-gray-400 hover:text-primary'
          } transition-colors`}
        >
          <ArchiveBoxIcon className="h-6 w-6" />
          <span className="text-xs">Archive</span>
        </button>
        <button 
          onClick={() => setCurrentView('all')}
          className={`flex flex-col items-center space-y-1 ${
            currentView === 'all' ? 'text-primary' : 'text-gray-400 hover:text-primary'
          } transition-colors`}
        >
          <ClockIcon className="h-6 w-6" />
          <span className="text-xs">All calls</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation; 