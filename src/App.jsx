import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import ActivityFeed from './components/activities/ActivityFeed';
import { ActivityProvider } from './context/ActivityContext';

console.log('App component loaded');

const App = () => {
  return (
    <ActivityProvider>
      <div className="container mx-auto max-w-md h-[666px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <ActivityFeed />
        </main>
        <Navigation />
      </div>
    </ActivityProvider>
  );
};

export default App;
