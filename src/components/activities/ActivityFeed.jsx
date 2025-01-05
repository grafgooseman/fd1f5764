import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useActivities } from '../../context/ActivityContext';
import ActivityCard from './ActivityCard';
import { ChevronUp, Archive, RefreshCw } from 'react-feather';
import { ANIMATION_DURATION } from '../../constants/animations';
import { v4 as uuidv4 } from 'uuid';

const ActivityFeed = ({ feedType }) => {
  const { 
    activities, 
    loading, 
    error, 
    fetchActivities, 
    archiveAllCalls, 
    resetAllCalls 
  } = useActivities();
  const [unStackedGroups, setUnStackedGroups] = useState(new Set());
  const [groupedByDate, setGroupedByDate] = useState({});
  const [sortedDates, setSortedDates] = useState([]);

  // Recalculate groups and dates whenever activities or feedType changes
  useEffect(() => {
    const recalculateGroups = () => {
      const groupedCalls = groupCallsByTimeAndNumber(activities);
      const grouped = groupByDate(groupedCalls);
      
      // Filter out dates with no activities
      const filteredGrouped = Object.fromEntries(
        Object.entries(grouped).filter(([_, groups]) => groups.length > 0)
      );
      
      setGroupedByDate(filteredGrouped);
      setSortedDates(
        Object.keys(filteredGrouped)
          .sort((a, b) => new Date(b) - new Date(a))
      );
    };

    recalculateGroups();
  }, [activities, feedType]);

  // Only fetch activities once on mount
  useEffect(() => {
    fetchActivities();
  }, []);

  // Reset unstacked groups when activities change
  useEffect(() => {
    setUnStackedGroups(new Set());
  }, [activities]);

  const groupCallsByTimeAndNumber = (activities) => {
    if (!Array.isArray(activities) || activities.length === 0) {
      return [];
    }

    const filteredActivities = activities.filter(activity => {
      if (feedType === 'archive') return activity.is_archived;
      if (feedType === 'calls') return !activity.is_archived;
      return true;
    });

    if (filteredActivities.length === 0) {
      return [];
    }

    const sortedActivities = [...filteredActivities].sort((a, b) => 
      new Date(b.created_at) - new Date(a.created_at)
    );

    const groups = [];
    let currentGroup = [];
    let currentGroupId = uuidv4();

    sortedActivities.forEach((activity) => {
      if (currentGroup.length === 0) {
        currentGroup.push(activity);
      } else {
        const lastCall = currentGroup[currentGroup.length - 1];
        const timeDiff = Math.abs(
          new Date(lastCall.created_at) - new Date(activity.created_at)
        ) / (1000 * 60);

        if (timeDiff <= 20 && lastCall.from === activity.from) {
          currentGroup.push(activity);
        } else {
          if (currentGroup.length > 0) {
            groups.push({ id: currentGroupId, calls: [...currentGroup] });
          }
          currentGroup = [activity];
          currentGroupId = uuidv4();
        }
      }
    });

    if (currentGroup.length > 0) {
      groups.push({ id: currentGroupId, calls: currentGroup });
    }

    return groups;
  };

  const groupByDate = (groups) => {
    return groups.reduce((acc, group) => {
      const date = new Date(group.calls[0].created_at).toLocaleDateString('en-US', {
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

  const renderActionButton = () => {
    if (feedType === 'all') return null;

    return (
      <button
        onClick={feedType === 'calls' ? archiveAllCalls : resetAllCalls}
        className="w-full flex items-center justify-center space-x-2 px-4 py-2 mb-4 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-sm"
      >
        {feedType === 'calls' ? (
          <>
            <Archive className="w-4 h-4" />
            <span>Archive All Calls</span>
          </>
        ) : (
          <>
            <RefreshCw className="w-4 h-4" />
            <span>Unarchive All Calls</span>
          </>
        )}
      </button>
    );
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

  return (
    <div className="divide-y divide-gray-100">
      <div className="px-4 pt-4">
        {renderActionButton()}
      </div>
      {sortedDates.map((date) => (
        <div key={date}>
          <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 uppercase tracking-wider">
            {date}
          </div>
          {groupedByDate[date].map((group, groupIndex) => {
            const groupKey = `${date}-${group.id}`;
            const isUnstacked = unStackedGroups.has(groupKey);

            if (isUnstacked) {
              return (
                <div 
                  key={groupKey}
                  className="relative"
                >
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
                    {group.calls.map((call, callIndex) => (
                      <div
                        key={`${groupKey}-${call.id}`}
                      >
                        <ActivityCard 
                          activity={call}
                          isGrouped={false}
                          isFirst={groupIndex === 0 && callIndex === 0}
                          isLast={groupIndex === groupedByDate[date].length - 1 && callIndex === group.calls.length - 1}
                          feedType={feedType}
                          groupId={group.id}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div
                key={groupKey}
              >
                <ActivityCard 
                  activity={group.calls[0]}
                  isGrouped={group.calls.length > 1}
                  isFirst={groupIndex === 0}
                  isLast={groupIndex === groupedByDate[date].length - 1}
                  groupSize={group.calls.length}
                  group={group.calls}
                  onUnstack={() => {
                    setUnStackedGroups(prev => new Set([...prev, groupKey]));
                  }}
                  groupKey={groupKey}
                  groupId={group.id}
                  feedType={feedType}
                />
              </div>
            );
          })}
        </div>
      ))}
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