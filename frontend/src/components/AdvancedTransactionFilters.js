import React, { useState } from 'react';
import { Search, Filter, Calendar, DollarSign, Package, X, ChevronDown } from 'lucide-react';

const AdvancedTransactionFilters = ({ onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: {
      start: '',
      end: ''
    },
    status: '',
    service: '',
    amountRange: {
      min: '',
      max: ''
    },
    sortBy: 'date',
    sortOrder: 'desc'
  });

  const serviceOptions = [
    { value: '', label: 'All Services' },
    { value: 'wash_fold', label: 'Wash & Fold' },
    { value: 'dry_cleaning', label: 'Dry Cleaning' },
    { value: 'ironing', label: 'Ironing' },
    { value: 'express_wash', label: 'Express Wash' },
    { value: 'premium_service', label: 'Premium Service' }
  ];

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'pending', label: 'Pending' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const sortOptions = [
    { value: 'date', label: 'Date' },
    { value: 'amount', label: 'Amount' },
    { value: 'service', label: 'Service' },
    { value: 'status', label: 'Status' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleNestedFilterChange = (parentKey, childKey, value) => {
    const newFilters = {
      ...filters,
      [parentKey]: {
        ...filters[parentKey],
        [childKey]: value
      }
    };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      search: '',
      dateRange: { start: '', end: '' },
      status: '',
      service: '',
      amountRange: { min: '', max: '' },
      sortBy: 'date',
      sortOrder: 'desc'
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const hasActiveFilters = () => {
    return (
      filters.search ||
      filters.dateRange.start ||
      filters.dateRange.end ||
      filters.status ||
      filters.service ||
      filters.amountRange.min ||
      filters.amountRange.max
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 mb-6">
      {/* Basic Search */}
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search transactions by order ID, service, or amount..."
              className="w-full pl-11 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filters
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
          {hasActiveFilters() && (
            <button
              onClick={handleClearAll}
              className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date Range
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => handleNestedFilterChange('dateRange', 'start', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  placeholder="Start date"
                />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => handleNestedFilterChange('dateRange', 'end', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  placeholder="End date"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Package className="w-4 h-4 inline mr-1" />
                Service Type
              </label>
              <select
                value={filters.service}
                onChange={(e) => handleFilterChange('service', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              >
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Amount Range
              </label>
              <div className="space-y-2">
                <input
                  type="number"
                  value={filters.amountRange.min}
                  onChange={(e) => handleNestedFilterChange('amountRange', 'min', e.target.value)}
                  placeholder="Min amount"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
                <input
                  type="number"
                  value={filters.amountRange.max}
                  onChange={(e) => handleNestedFilterChange('amountRange', 'max', e.target.value)}
                  placeholder="Max amount"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <div className="space-y-2">
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <select
                  value={filters.sortOrder}
                  onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                >
                  <option value="desc">Descending</option>
                  <option value="asc">Ascending</option>
                </select>
              </div>
            </div>

            {/* Quick Filters */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Filters
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    handleNestedFilterChange('dateRange', 'start', today);
                    handleNestedFilterChange('dateRange', 'end', today);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Today's Transactions
                </button>
                <button
                  onClick={() => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    const today = new Date().toISOString().split('T')[0];
                    handleNestedFilterChange('dateRange', 'start', weekAgo.toISOString().split('T')[0]);
                    handleNestedFilterChange('dateRange', 'end', today);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => {
                    const monthAgo = new Date();
                    monthAgo.setMonth(monthAgo.getMonth() - 1);
                    const today = new Date().toISOString().split('T')[0];
                    handleNestedFilterChange('dateRange', 'start', monthAgo.toISOString().split('T')[0]);
                    handleNestedFilterChange('dateRange', 'end', today);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Last 30 Days
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters() && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2 flex-wrap">
                <span className="text-sm font-medium text-gray-700">Active filters:</span>
                {filters.search && (
                  <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    Search: "{filters.search}"
                    <button
                      onClick={() => handleFilterChange('search', '')}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.status && (
                  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Status: {statusOptions.find(s => s.value === filters.status)?.label}
                    <button
                      onClick={() => handleFilterChange('status', '')}
                      className="ml-1 text-green-600 hover:text-green-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.service && (
                  <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    Service: {serviceOptions.find(s => s.value === filters.service)?.label}
                    <button
                      onClick={() => handleFilterChange('service', '')}
                      className="ml-1 text-purple-600 hover:text-purple-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {(filters.dateRange.start || filters.dateRange.end) && (
                  <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                    Date: {filters.dateRange.start || '...'} to {filters.dateRange.end || '...'}
                    <button
                      onClick={() => handleNestedFilterChange('dateRange', 'start', '') || handleNestedFilterChange('dateRange', 'end', '')}
                      className="ml-1 text-orange-600 hover:text-orange-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedTransactionFilters;
