import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ActivityFeed from './components/activities/ActivityFeed';
import ArchivedFeed from './components/activities/ArchivedFeed';
import { ActivityProvider } from './context/ActivityContext';

console.log('App component loaded');

const App = () => {
  const [currentView, setCurrentView] = useState('calls'); // 'calls', 'archive', or 'all'

  return (
    <ActivityProvider>
      <div className="container mx-auto max-w-md h-[666px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <Header currentView={currentView} />
        <main className="flex-1 overflow-y-auto">
          {currentView === 'calls' && <ActivityFeed />}
          {currentView === 'archive' && <ArchivedFeed />}
          {currentView === 'all' && <ActivityFeed showAll />}
        </main>
        <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      </div>
    </ActivityProvider>
  );
};

export default App;
