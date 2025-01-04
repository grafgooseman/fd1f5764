import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActivities } from '../../context/ActivityContext';
import ActivityCard from './ActivityCard';

const ActivityFeed = () => {
  const { activities, loading, error, fetchActivities } = useActivities();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  console.log('Activities:', activities);
  console.log('Loading:', loading);
  console.log('Error:', error);

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
      if (activity.is_archived) return;

      if (currentGroup.length === 0) {
        currentGroup.push(activity);
      } else {
        const lastCall = currentGroup[currentGroup.length - 1];
        const timeDiff = Math.abs(
          new Date(lastCall.created_at) - new Date(activity.created_at)
        ) / (1000 * 60); // Convert to minutes

        if (
          timeDiff <= 20 && 
          lastCall.from === activity.from &&
          !lastCall.is_archived
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
              // Only take the most recent call from the group
              const mostRecentCall = group[0];
              return (
                <motion.div
                  key={`${date}-${groupIndex}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ActivityCard 
                    activity={mostRecentCall}
                    isGrouped={group.length > 1}
                    isFirst={groupIndex === 0}
                    isLast={groupIndex === groupedByDate[date].length - 1}
                    groupSize={group.length}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        ))}
      </AnimatePresence>
      {sortedDates.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No calls to display
        </div>
      )}
    </div>
  );
};

export default ActivityFeed; 