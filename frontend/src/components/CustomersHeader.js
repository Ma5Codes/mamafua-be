import React from 'react';
import { UserPlus } from 'lucide-react';

const CustomersHeader = ({ onAddCustomer }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
      </div>
      
      <button
        onClick={onAddCustomer}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        <UserPlus className="w-4 h-4 mr-2" />
        Add Customer
      </button>
    </div>
  );
};

export default CustomersHeader;
