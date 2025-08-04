import React from 'react';
import { Search } from 'lucide-react';

const CustomerSearch = ({ searchTerm, onSearchChange, placeholder = "Search customers" }) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors bg-white"
        />
      </div>
    </div>
  );
};

export default CustomerSearch;
