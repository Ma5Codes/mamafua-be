import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, DollarSign, Package, Clock, BarChart3 } from 'lucide-react';

const CustomerAnalytics = ({ customerId, customerName }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');

  // Mock analytics data - in real app, this would come from API
  const analyticsData = {
    trends: {
      orderFrequency: {
        current: 2.3,
        previous: 1.8,
        change: '+27.8%',
        trend: 'up'
      },
      averageSpend: {
        current: 52.08,
        previous: 48.50,
        change: '+7.4%',
        trend: 'up'
      },
      servicePreference: {
        washFold: 65,
        dryCleaning: 25,
        ironing: 10
      }
    },
    monthlySpending: [
      { month: 'Jan', amount: 180 },
      { month: 'Feb', amount: 220 },
      { month: 'Mar', amount: 195 },
      { month: 'Apr', amount: 240 },
      { month: 'May', amount: 210 },
      { month: 'Jun', amount: 280 },
      { month: 'Jul', amount: 320 },
      { month: 'Aug', amount: 290 }
    ],
    insights: [
      {
        type: 'positive',
        title: 'Increasing Loyalty',
        description: 'Customer has increased order frequency by 28% in the last 3 months',
        icon: TrendingUp,
        color: 'text-green-600'
      },
      {
        type: 'neutral',
        title: 'Service Preference',
        description: 'Prefers Wash & Fold service (65% of orders)',
        icon: Package,
        color: 'text-blue-600'
      },
      {
        type: 'opportunity',
        title: 'Upsell Opportunity',
        description: 'Has never tried premium dry cleaning services',
        icon: TrendingUp,
        color: 'text-orange-600'
      }
    ]
  };

  const getTrendIcon = (trend) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Customer Analytics</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedPeriod('3months')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === '3months'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            3 Months
          </button>
          <button
            onClick={() => setSelectedPeriod('6months')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === '6months'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            6 Months
          </button>
          <button
            onClick={() => setSelectedPeriod('1year')}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === '1year'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            1 Year
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Order Frequency</p>
              <p className="text-xs text-gray-500">Orders per month</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              {analyticsData.trends.orderFrequency.current}
            </span>
            <div className="flex items-center">
              {React.createElement(getTrendIcon(analyticsData.trends.orderFrequency.trend), {
                className: `w-4 h-4 ${getTrendColor(analyticsData.trends.orderFrequency.trend)}`
              })}
              <span className={`text-sm font-medium ${getTrendColor(analyticsData.trends.orderFrequency.trend)}`}>
                {analyticsData.trends.orderFrequency.change}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Spend</p>
              <p className="text-xs text-gray-500">Per order</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${analyticsData.trends.averageSpend.current}
            </span>
            <div className="flex items-center">
              {React.createElement(getTrendIcon(analyticsData.trends.averageSpend.trend), {
                className: `w-4 h-4 ${getTrendColor(analyticsData.trends.averageSpend.trend)}`
              })}
              <span className={`text-sm font-medium ${getTrendColor(analyticsData.trends.averageSpend.trend)}`}>
                {analyticsData.trends.averageSpend.change}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Spending Chart */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending Trend</h4>
        <div className="h-64 flex items-end justify-between space-x-2">
          {analyticsData.monthlySpending.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors cursor-pointer"
                style={{ height: `${(data.amount / 320) * 200}px` }}
                title={`${data.month}: $${data.amount}`}
              ></div>
              <span className="text-xs text-gray-600 mt-2">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Service Preferences */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Service Preferences</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900">Wash & Fold</span>
              <span className="text-sm text-gray-600">{analyticsData.trends.servicePreference.washFold}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${analyticsData.trends.servicePreference.washFold}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900">Dry Cleaning</span>
              <span className="text-sm text-gray-600">{analyticsData.trends.servicePreference.dryCleaning}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${analyticsData.trends.servicePreference.dryCleaning}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-900">Ironing</span>
              <span className="text-sm text-gray-600">{analyticsData.trends.servicePreference.ironing}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${analyticsData.trends.servicePreference.ironing}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Insights</h4>
        <div className="space-y-4">
          {analyticsData.insights.map((insight, index) => {
            const IconComponent = insight.icon;
            return (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <IconComponent className={`w-5 h-5 ${insight.color} mt-0.5`} />
                <div>
                  <h5 className="text-sm font-semibold text-gray-900">{insight.title}</h5>
                  <p className="text-sm text-gray-600">{insight.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CustomerAnalytics;
