import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ActivityFeed from './components/activities/ActivityFeed';
import Dialer from './components/Dialer.jsx';
import Profile from './components/Profile.jsx';
import { ActivityProvider } from './context/ActivityContext';
import { ThemeProvider } from './context/ThemeContext';

console.log('App component loaded');

const App = () => {
  const [currentView, setCurrentView] = useState('calls');

  const renderView = () => {
    switch (currentView) {
      case 'dialer':
        return <Dialer />;
      case 'profile':
        return <Profile />;
      default:
        return <ActivityFeed feedType={currentView} />;
    }
  };

  return (
    <ThemeProvider>
      <ActivityProvider>
        <div className="container mx-auto max-w-md h-[666px] bg-theme-light-bg-primary dark:bg-theme-dark-bg-primary rounded-xl shadow-2xl overflow-hidden flex flex-col">
          <Header currentView={currentView} />
          <main className="flex-1 overflow-y-auto">
            {renderView()}
          </main>
          <Navigation currentView={currentView} setCurrentView={setCurrentView} />
        </div>
      </ActivityProvider>
    </ThemeProvider>
  );
};

export default App;
