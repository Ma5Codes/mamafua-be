import React from 'react';

const RevenueOverview = ({ totalRevenue = 12500, changePercent = '+15%', period = 'Last 30 Days' }) => {
  // SVG path for the revenue trend line matching Figma design
  const chartPath = "M 20 120 Q 80 80 140 100 Q 200 120 260 90 Q 320 70 380 110 Q 440 130 500 60 Q 560 40 620 80 Q 680 100 740 70";
  
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Revenue Overview</h3>
        <div className="flex items-baseline space-x-3">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">
              ${totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{period}</span>
            <span className="text-sm font-medium text-green-500">{changePercent}</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-48 relative">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 760 160"
          className="overflow-visible"
        >
          <defs>
            {/* Gradient for the area under the curve */}
            <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          
          {/* Grid lines */}
          <defs>
            <pattern id="revenueGrid" width="60" height="40" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          
          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#revenueGrid)" />
          
          {/* Area under the curve */}
          <path
            d={`${chartPath} L 740 160 L 20 160 Z`}
            fill="url(#revenueGradient)"
          />
          
          {/* Main trend line */}
          <path
            d={chartPath}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {[
            { x: 20, y: 120 },
            { x: 140, y: 100 },
            { x: 260, y: 90 },
            { x: 380, y: 110 },
            { x: 500, y: 60 },
            { x: 620, y: 80 },
            { x: 740, y: 70 }
          ].map((point, index) => (
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
      </div>
    </div>
  );
};

export default RevenueOverview;
