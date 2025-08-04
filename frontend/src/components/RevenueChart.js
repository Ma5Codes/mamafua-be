import React, { useState } from 'react';

const RevenueChart = () => {
  const [activeTab, setActiveTab] = useState('Daily');

  // SVG path for the smooth curve matching Figma design
  const chartPath = "M 20 180 Q 60 120 100 140 Q 140 160 180 100 Q 220 80 260 120 Q 300 140 340 60 Q 380 40 420 80 Q 460 100 500 140";
  
  // Data points for the chart
  const dataPoints = [
    { x: 20, y: 180 },
    { x: 100, y: 140 },
    { x: 180, y: 100 },
    { x: 260, y: 120 },
    { x: 340, y: 60 },
    { x: 420, y: 80 },
    { x: 500, y: 140 }
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
        
        {/* Tab buttons */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('Daily')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'Daily'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setActiveTab('Weekly')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'Weekly'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 520 200"
          className="overflow-visible"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
            
            {/* Gradient for the area under the curve */}
            <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          
          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Area under the curve */}
          <path
            d={`${chartPath} L 500 200 L 20 200 Z`}
            fill="url(#areaGradient)"
          />
          
          {/* Main curve line */}
          <path
            d={chartPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {dataPoints.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#3b82f6"
              stroke="#ffffff"
              strokeWidth="2"
              className="hover:r-6 transition-all cursor-pointer"
            />
          ))}
        </svg>
        
        {/* Hover tooltip (you can enhance this later) */}
        <div className="absolute bottom-4 left-4 text-xs text-gray-500">
          Hover over points for details
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
