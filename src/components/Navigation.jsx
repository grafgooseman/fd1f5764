import React from 'react';
import { PhoneIcon, ArchiveBoxIcon, ClockIcon } from '@heroicons/react/24/outline';

const Navigation = () => {
  return (
    <nav className="bg-white border-t border-gray-100 sticky bottom-0">
      <div className="flex justify-around py-3">
        <button className="flex flex-col items-center space-y-1 text-primary">
          <PhoneIcon className="h-6 w-6" />
          <span className="text-xs">Calls</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-primary transition-colors">
          <ArchiveBoxIcon className="h-6 w-6" />
          <span className="text-xs">Archive</span>
        </button>
        <button className="flex flex-col items-center space-y-1 text-gray-400 hover:text-primary transition-colors">
          <ClockIcon className="h-6 w-6" />
          <span className="text-xs">All calls</span>
        </button>
      </div>
    </nav>
  );
};

export default Navigation; 