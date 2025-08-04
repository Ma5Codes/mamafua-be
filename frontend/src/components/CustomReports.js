import React, { useState } from 'react';

const CustomReports = ({ onGenerateReport }) => {
  const [dateRange, setDateRange] = useState({
    startDate: '2024-07-05',
    endDate: '2024-08-07'
  });

  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateReport = () => {
    onGenerateReport(dateRange);
  };

  const handleCancel = () => {
    // Reset to default dates
    setDateRange({
      startDate: '2024-07-05',
      endDate: '2024-08-07'
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Custom Reports</h3>
      
      <div className="space-y-4">
        {/* Date Range Label */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Date Range
          </label>
          
          {/* Date Range Input */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => handleDateChange('startDate', e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
              <span className="text-gray-500 text-sm">-</span>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => handleDateChange('endDate', e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3 ml-auto">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateReport}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomReports;
