import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActivities } from '../../context/ActivityContext';
import ActivityCard from './ActivityCard';
import { ChevronUp } from 'react-feather';

const ActivityFeed = ({ feedType }) => {
  const { activities, loading, error, fetchActivities } = useActivities();
  const [unStackedGroups, setUnStackedGroups] = useState(new Set());

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  // Reset unstacked groups when activities change
  useEffect(() => {
    setUnStackedGroups(new Set());
  }, [activities]);

  const groupCallsByTimeAndNumber = (activities) => {
    if (!Array.isArray(activities) || activities.length === 0) {
      return [];
    }

    // Sort activities by date first
    const sortedActivities = [...activities].sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );

    const groups = [];
    let currentGroup = [];

    sortedActivities.forEach((activity) => {
      // Filter based on feedType
      if (feedType === 'archive' && !activity.is_archived) return;
      if (feedType === 'calls' && activity.is_archived) return;
      // 'all' shows everything, so no filtering needed

      if (currentGroup.length === 0) {
        currentGroup.push(activity);
      } else {
        const lastCall = currentGroup[currentGroup.length - 1];
        const timeDiff = Math.abs(
          new Date(lastCall.created_at) - new Date(activity.created_at)
        ) / (1000 * 60); // Convert to minutes

        if (
          timeDiff <= 20 && 
          lastCall.from === activity.from
        ) {
          currentGroup.push(activity);
        } else {
          if (currentGroup.length > 0) {
            groups.push([...currentGroup]);
          }
          currentGroup = [activity];
        }
      }
    });

    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }

    return groups;
  };

  const groupByDate = (groups) => {
    return groups.reduce((acc, group) => {
      const date = new Date(group[0].created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(group);
      return acc;
    }, {});
  };

  const handleRestack = (groupKey) => {
    setUnStackedGroups(prev => {
      const newSet = new Set(prev);
      newSet.delete(groupKey);
      return newSet;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }

  const groupedCalls = groupCallsByTimeAndNumber(activities);
  const groupedByDate = groupByDate(groupedCalls);
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => 
    new Date(b) - new Date(a)
  );

  return (
    <div className="divide-y divide-gray-100">
      <AnimatePresence>
        {sortedDates.map((date) => (
          <motion.div
            key={date}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 uppercase tracking-wider">
              {date}
            </div>
            {groupedByDate[date].map((group, groupIndex) => {
              const groupKey = `${date}-${groupIndex}`;
              const isUnstacked = unStackedGroups.has(groupKey);

              if (isUnstacked) {
                return (
                  <motion.div key={groupKey} className="relative">
                    <div className="absolute left-5 top-0 bottom-0 w-1 bg-primary-100">
                      <button 
                        onClick={() => handleRestack(groupKey)}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-primary-100 hover:border-primary-300 hover:bg-primary-50 transition-colors flex items-center justify-center shadow-sm"
                        title="Combine calls"
                      >
                        <ChevronUp className="w-4 h-4 text-primary-500" />
                      </button>
                    </div>
                    <div className="pl-9">
                      {group.map((call, callIndex) => (
                        <motion.div
                          key={call.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          <ActivityCard 
                            activity={call}
                            isGrouped={false}
                            isFirst={groupIndex === 0 && callIndex === 0}
                            isLast={groupIndex === groupedByDate[date].length - 1 && callIndex === group.length - 1}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              }

              return (
                <motion.div
                  key={groupKey}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ActivityCard 
                    activity={group[0]}
                    isGrouped={group.length > 1}
                    isFirst={groupIndex === 0}
                    isLast={groupIndex === groupedByDate[date].length - 1}
                    groupSize={group.length}
                    group={group}
                    onUnstack={() => {
                      setUnStackedGroups(prev => new Set([...prev, groupKey]));
                    }}
                    groupKey={groupKey}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </AnimatePresence>
      {sortedDates.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          {feedType === 'archive' 
            ? 'No archived calls to display' 
            : feedType === 'all'
            ? 'No calls to display'
            : 'No active calls to display'}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed; 