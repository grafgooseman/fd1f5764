import React, { createContext, useContext, useReducer, useCallback } from 'react';

const ActivityContext = createContext();

const initialState = {
  activities: [],
  loading: false,
  error: null,
};

function activityReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, activities: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'TOGGLE_ARCHIVE':
      return {
        ...state,
        activities: state.activities.map(activity =>
          activity.id === action.payload
            ? { ...activity, is_archived: !activity.is_archived }
            : activity
        ),
      };
    default:
      return state;
  }
}

export function ActivityProvider({ children }) {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const fetchActivities = useCallback(async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const response = await fetch('https://aircall-api.onrender.com/activities');
      const data = await response.json();
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  }, []);

  const value = {
    ...state,
    fetchActivities,
    dispatch,
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}

export const useActivities = () => {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error('useActivities must be used within an ActivityProvider');
  }
  return context;
}; 