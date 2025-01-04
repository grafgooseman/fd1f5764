import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActivities } from '../../context/ActivityContext';
import ActivityCard from './ActivityCard';

const ActivityFeed = () => {
  const { activities, loading, error, fetchActivities } = useActivities();

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

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

  const nonArchivedActivities = activities.filter(activity => !activity.is_archived);

  return (
    <div className="divide-y divide-gray-100">
      <AnimatePresence>
        {nonArchivedActivities.map(activity => (
          <motion.div
            key={activity.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ActivityCard activity={activity} />
          </motion.div>
        ))}
      </AnimatePresence>
      {nonArchivedActivities.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No calls to display
        </div>
      )}
    </div>
  );
};

export default ActivityFeed; 