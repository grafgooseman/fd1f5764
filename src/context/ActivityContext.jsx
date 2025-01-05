import React, { createContext, useContext, useReducer, useCallback, useState } from 'react';

export const ActivityContext = createContext();

export const ActivityProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('https://aircall-api.onrender.com/activities');
      const data = await response.json();
      setActivities(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch activities');
    } finally {
      setLoading(false);
    }
  }, []);

  const archiveCall = async (callId) => {
    try {
      const response = await fetch(`https://aircall-api.onrender.com/activities/${callId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_archived: true }),
      });
      
      if (!response.ok) throw new Error('Failed to archive call');
      
      // Update local state
      setActivities(prevActivities => 
        prevActivities.map(activity => 
          activity.id === callId 
            ? { ...activity, is_archived: true }
            : activity
        )
      );
    } catch (err) {
      setError('Failed to archive call');
    }
  };

  const unarchiveCall = async (callId) => {
    try {
      const response = await fetch(`https://aircall-api.onrender.com/activities/${callId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_archived: false }),
      });
      
      if (!response.ok) throw new Error('Failed to unarchive call');
      
      // Update local state
      setActivities(prevActivities => 
        prevActivities.map(activity => 
          activity.id === callId 
            ? { ...activity, is_archived: false }
            : activity
        )
      );
    } catch (err) {
      setError('Failed to unarchive call');
    }
  };

  const archiveAllCalls = async () => {
    try {
      // Update all non-archived calls
      const promises = activities
        .filter(activity => !activity.is_archived)
        .map(activity => 
          fetch(`https://aircall-api.onrender.com/activities/${activity.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ is_archived: true }),
          })
        );

      await Promise.all(promises);
      
      // Update local state
      setActivities(prevActivities => 
        prevActivities.map(activity => ({ ...activity, is_archived: true }))
      );
    } catch (err) {
      setError('Failed to archive all calls');
    }
  };

  const resetAllCalls = async () => {
    try {
      const response = await fetch('https://aircall-api.onrender.com/reset', {
        method: 'PATCH',
      });
      
      if (!response.ok) throw new Error('Failed to reset calls');
      
      // Refresh activities after reset
      await fetchActivities();
    } catch (err) {
      setError('Failed to reset calls');
    }
  };

  return (
    <ActivityContext.Provider value={{
      activities,
      loading,
      error,
      fetchActivities,
      archiveCall,
      unarchiveCall,
      archiveAllCalls,
      resetAllCalls,
    }}>
      {children}
    </ActivityContext.Provider>
  );
};

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
}; 