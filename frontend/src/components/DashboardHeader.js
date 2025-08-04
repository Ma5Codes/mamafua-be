import React from 'react';
import { Plus, UserPlus } from 'lucide-react';

const DashboardHeader = ({ onNewTransaction, onAddCustomer }) => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-6">
      <div className="flex items-center justify-between">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button 
            onClick={onNewTransaction}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Transaction
          </button>
          
          <button 
            onClick={onAddCustomer}
            className="flex items-center px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Customer
          </button>
          
          {/* User Profile */}
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center ml-4">
            <span className="text-gray-600 text-sm font-medium">A</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
