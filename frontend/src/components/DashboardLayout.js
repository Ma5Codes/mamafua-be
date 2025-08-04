import React from 'react';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import StatsCards from './StatsCards';
import RevenueChart from './RevenueChart';
import RecentActivity from './RecentActivity';

const DashboardLayout = ({ currentScreen, onNavigate }) => {
  // Mock dashboard data matching Figma design
  const dashboardStats = {
    totalWeight: { value: 1250, change: '+10%' },
    totalRevenue: { value: 8750, change: '+18%' },
    transactions: { value: 520, change: '+12%' },
    customers: { value: 210, change: '+5%' }
  };

  const handleNewTransaction = () => {
    // Navigate to transactions or open modal
    onNavigate('transactions');
  };

  const handleAddCustomer = () => {
    // Navigate to customers or open modal
    onNavigate('customers');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar currentScreen={currentScreen} onNavigate={onNavigate} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader 
          onNewTransaction={handleNewTransaction}
          onAddCustomer={handleAddCustomer}
        />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-8">
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
      </div>
    </div>
  );
};

export default DashboardLayout;
