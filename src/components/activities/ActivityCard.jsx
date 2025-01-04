import React from 'react';
import { PhoneIncoming, PhoneOutgoing, PhoneMissed } from 'react-feather';

const ActivityCard = ({ activity }) => {
  const getCallIcon = () => {
    if (activity.call_type === 'missed') {
      return <PhoneMissed className="w-5 h-5 text-red-500" />;
    }
    return activity.direction === 'inbound' 
      ? <PhoneIncoming className="w-5 h-5 text-primary" />
      : <PhoneOutgoing className="w-5 h-5 text-blue-500" />;
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white p-4 border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 ease-in-out transform hover:scale-[1.02]">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {getCallIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {activity.from || 'Unknown'}
          </p>
          <p className="text-sm text-gray-500 truncate">
            via {activity.via}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {formatTime(activity.created_at)}
          </p>
          <p className="text-sm text-gray-400">
            {Math.floor(activity.duration / 60)}:{(activity.duration % 60).toString().padStart(2, '0')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard; 