import React, { useState, useEffect } from 'react';
import { PhoneIncoming, PhoneOutgoing, PhoneMissed, Archive } from 'react-feather';
import { motion, AnimatePresence } from 'framer-motion';
import { useActivities } from '../../context/ActivityContext';
import { ANIMATION_DURATION } from '../../constants/animations';

const DisintegrationParticle = ({ x, y }) => (
  <motion.div
    className="absolute w-1 h-1 bg-gray-400 rounded-full"
    initial={{ x, y, opacity: 1 }}
    animate={{
      x: x + (Math.random() - 0.5) * 100,
      y: y + (Math.random() - 0.5) * 100,
      opacity: 0
    }}
    transition={{ duration: ANIMATION_DURATION, ease: "easeOut" }}
  />
);

const ActivityCard = ({ 
  activity, 
  isGrouped, 
  isFirst, 
  isLast, 
  groupSize, 
  onUnstack,
  groupKey,
  feedType,
  group 
}) => {
  const { archiveCall, unarchiveCall, fetchActivities } = useActivities();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDisintegrating, setIsDisintegrating] = useState(false);
  const [particles, setParticles] = useState([]);
  const [isRemoving, setIsRemoving] = useState(false);

  const createParticles = () => {
    const numParticles = 50;
    const newParticles = [];
    
    for (let i = 0; i < numParticles; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 300,
        y: Math.random() * 100
      });
    }
    
    setParticles(newParticles);
  };

  // Close expanded view when archived
  useEffect(() => {
    if (activity.is_archived) {
      setIsExpanded(false);
    }
  }, [activity.is_archived]);

  const getCallIcon = (callType, direction) => {
    if (callType === 'missed') {
      return <PhoneMissed className="w-5 h-5 text-red-500" />;
    }
    return direction === 'inbound' 
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDuration = (seconds) => {
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const handleClick = () => {
    if (isGrouped) {
      onUnstack(groupKey);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const handleArchiveAction = async (e) => {
    e.stopPropagation();
    setIsDisintegrating(true);
    createParticles();

    // Wait for particle animation
    await new Promise(resolve => setTimeout(resolve, ANIMATION_DURATION * 1000));
    
    setIsRemoving(true);
    
    try {
      if (isGrouped && group) {
        // Archive/unarchive all calls in the group
        const promises = group.map(call => {
          if (activity.is_archived) {
            return unarchiveCall(call.id);
          } else {
            return archiveCall(call.id);
          }
        });
        await Promise.all(promises);
      } else {
        // Single call archive/unarchive
        if (activity.is_archived) {
          await unarchiveCall(activity.id);
        } else {
          await archiveCall(activity.id);
        }
      }
    } catch (error) {
      console.error('Error handling archive action:', error);
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 1 }}
      animate={{ 
        opacity: isRemoving ? 0 : 1,
        height: isRemoving ? 0 : 'auto'
      }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ 
        duration: ANIMATION_DURATION,
        height: { duration: ANIMATION_DURATION * 0.5 }
      }}
    >
      <motion.div
        animate={{
          opacity: isDisintegrating ? 0 : 1,
          scale: isDisintegrating ? 0.8 : 1,
        }}
        transition={{ duration: ANIMATION_DURATION }}
      >
        <div 
          onClick={handleClick}
          className={`
            bg-white p-4 border-b border-gray-100 
            hover:bg-gray-50 transition-all duration-200 ease-in-out cursor-pointer
            ${isExpanded ? 'bg-gray-50' : ''}
            ${isFirst ? 'rounded-t-lg' : ''}
            ${isLast ? 'rounded-b-lg border-b-0' : ''}
          `}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {getCallIcon(activity.call_type, activity.direction)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {activity.from || 'Unknown'}
                  {isGrouped && groupSize > 1 && (
                    <span className="ml-2 inline-flex items-center justify-center bg-red-500 rounded-full w-4 h-4 text-[10px] font-medium text-white">
                      {groupSize}
                    </span>
                  )}
                </p>
              </div>
              <p className="text-sm text-gray-500 truncate">
                via {activity.via}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {formatTime(activity.created_at)}
              </p>
              <p className="text-sm text-gray-400">
                {formatDuration(activity.duration)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {!isGrouped && isExpanded && !isDisintegrating && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-b border-gray-100 bg-gray-50"
          >
            <div className="p-4 space-y-4">
              {/* Details for the main call */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-900">Call Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-gray-500">Date:</p>
                  <p className="text-gray-900">{formatDate(activity.created_at)}</p>
                  <p className="text-gray-500">Time:</p>
                  <p className="text-gray-900">{formatTime(activity.created_at)}</p>
                  <p className="text-gray-500">Duration:</p>
                  <p className="text-gray-900">{formatDuration(activity.duration)}</p>
                  <p className="text-gray-500">Direction:</p>
                  <p className="text-gray-900 capitalize">{activity.direction}</p>
                  <p className="text-gray-500">Via:</p>
                  <p className="text-gray-900">{activity.via}</p>
                </div>
              </div>

              {/* Show grouped calls if any */}
              {isGrouped && group.length > 1 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-900">Related Calls</h3>
                  <div className="space-y-2">
                    {group.slice(1).map((call) => (
                      <div key={call.id} className="flex justify-between text-sm border-t border-gray-100 pt-2">
                        <div className="flex items-center space-x-2">
                          <div className="flex-shrink-0">
                            {getCallIcon(call.call_type, call.direction)}
                          </div>
                          <span className="text-gray-900">{formatTime(call.created_at)}</span>
                        </div>
                        <span className="text-gray-500">{formatDuration(call.duration)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Archive button - only show if not in 'all' view */}
              {feedType !== 'all' && (
                <button 
                  onClick={handleArchiveAction}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  <Archive className="w-4 h-4" />
                  <span>{activity.is_archived ? 'Unarchive' : 'Archive'} Call</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isDisintegrating && (
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ 
            duration: ANIMATION_DURATION,
            height: { duration: ANIMATION_DURATION * 0.5 }
          }}
        >
          {particles.map(particle => (
            <DisintegrationParticle
              key={particle.id}
              x={particle.x}
              y={particle.y}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ActivityCard; 