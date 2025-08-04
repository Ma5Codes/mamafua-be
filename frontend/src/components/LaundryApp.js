import React, { useState } from 'react';
import TransactionsScreen from './TransactionsScreen';
import AppLayout from './AppLayout';
import AuthLayout from './AuthLayout';

const LaundryApp = () => {
  const [currentScreen, setCurrentScreen] = useState('auth');

  const handleAuthSuccess = (targetScreen) => {
    setCurrentScreen(targetScreen);
  };



  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'auth':
      case 'login':
      case 'register':
        return <AuthLayout onAuthSuccess={handleAuthSuccess} />;
      case 'transactions':
        return <TransactionsScreen onNavigate={setCurrentScreen} />;
      case 'dashboard':
      case 'reports':
      case 'customers':
      case 'settings':
        return <AppLayout currentScreen={currentScreen} onNavigate={setCurrentScreen} />;
      default:
        return <AuthLayout onAuthSuccess={handleAuthSuccess} />;
    }
  };

  return (
    <div>
      {renderCurrentScreen()}
    </div>
  );
};

export default LaundryApp;
