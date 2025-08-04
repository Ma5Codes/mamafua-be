import React from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import StatsCards from './StatsCards';
import RevenueChart from './RevenueChart';
import RecentActivity from './RecentActivity';
import ReportsLayout from './ReportsLayout';
import CustomersLayout from './CustomersLayout';

const AppLayout = ({ currentScreen, onNavigate }) => {
  const handleNewTransaction = () => {
    onNavigate('transactions');
  };

  const handleAddCustomer = () => {
    onNavigate('customers');
  };

  const renderScreenContent = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardContent />;
      case 'reports':
        return <ReportsLayout />;
      case 'customers':
        return <CustomersLayout />;
      case 'settings':
        return (
          <div className="p-8">
            <div className="text-center text-gray-500">
              <h2 className="text-xl font-semibold mb-2">Settings</h2>
              <p>Settings screen coming soon...</p>
            </div>
          </div>
        );
      default:
        return <DashboardContent />;
    }
  };

  const DashboardContent = () => {
    // Mock dashboard data matching Figma design
    const dashboardStats = {
      totalWeight: { value: 1250, change: '+10%' },
      totalRevenue: { value: 8750, change: '+18%' },
      transactions: { value: 520, change: '+12%' },
      customers: { value: 210, change: '+5%' }
    };

    return (
      <div className="p-8">
        {/* Stats Cards */}
        <div className="mb-8">
          <StatsCards stats={dashboardStats} />
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Chart - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RevenueChart />
          </div>

          {/* Recent Activity - Takes 1 column */}
          <div className="lg:col-span-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    );
  };

  const getPageTitle = () => {
    switch (currentScreen) {
      case 'dashboard':
        return 'Dashboard';
      case 'reports':
        return 'Reports';
      case 'customers':
        return 'Customers';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const shouldShowHeader = () => {
    // Don't show the dashboard header for pages that have their own headers
    return !['reports', 'customers'].includes(currentScreen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar currentScreen={currentScreen} onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Only show for certain screens */}
        {shouldShowHeader() && (
          <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
              </div>

              {/* Action Buttons - Only show on dashboard */}
              {currentScreen === 'dashboard' && (
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleNewTransaction}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    New Transaction
                  </button>
                  
                  <button 
                    onClick={handleAddCustomer}
                    className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Add Customer
                  </button>
                  
                  {/* User Profile */}
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center ml-4">
                    <span className="text-gray-600 text-sm font-medium">A</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Screen Content */}
        <div className="flex-1 overflow-auto">
          {renderScreenContent()}
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
