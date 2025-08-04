import React from 'react';
import { TrendingUp, AlertTriangle, Star, Target, Gift, Clock, DollarSign, Users } from 'lucide-react';

const CustomerInsights = ({ customer }) => {
  // Mock insights data - in real app, this would come from AI/ML analysis
  const insights = {
    behaviorScore: 85,
    loyaltyLevel: 'High',
    riskLevel: 'Low',
    recommendations: [
      {
        type: 'upsell',
        priority: 'high',
        title: 'Premium Service Opportunity',
        description: 'Customer has never tried premium dry cleaning. Based on spending patterns, they may be interested.',
        action: 'Offer 20% discount on first premium service',
        icon: Star,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
      },
      {
        type: 'retention',
        priority: 'medium',
        title: 'Loyalty Program Enrollment',
        description: 'Customer qualifies for VIP status with 24 completed orders.',
        action: 'Invite to VIP loyalty program',
        icon: Gift,
        color: 'text-purple-600',
        bgColor: 'bg-purple-50'
      },
      {
        type: 'engagement',
        priority: 'low',
        title: 'Communication Preference',
        description: 'Customer responds well to SMS notifications (95% open rate).',
        action: 'Continue SMS for order updates',
        icon: Target,
        color: 'text-blue-600',
        bgColor: 'bg-blue-50'
      }
    ],
    patterns: [
      {
        title: 'Peak Usage Days',
        value: 'Weekends',
        description: '70% of orders placed on Sat-Sun',
        icon: Clock,
        trend: 'stable'
      },
      {
        title: 'Average Order Frequency',
        value: '2.3x/month',
        description: 'Above average customer frequency',
        icon: TrendingUp,
        trend: 'up'
      },
      {
        title: 'Price Sensitivity',
        value: 'Low',
        description: 'Rarely uses discount codes',
        icon: DollarSign,
        trend: 'stable'
      },
      {
        title: 'Service Loyalty',
        value: 'High',
        description: 'Consistent service preferences',
        icon: Star,
        trend: 'up'
      }
    ],
    predictions: {
      nextOrderDate: '2024-08-15',
      nextOrderProbability: 85,
      churnRisk: 15,
      lifetimeValue: 2400
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50';
      case 'low':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getPriorityBadge = (priority) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (priority) {
      case 'high':
        return `${baseClasses} bg-red-100 text-red-700`;
      case 'medium':
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case 'low':
        return `${baseClasses} bg-green-100 text-green-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Customer Score Overview */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Intelligence</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-600">{insights.behaviorScore}</span>
            </div>
            <p className="text-sm font-medium text-gray-900">Behavior Score</p>
            <p className="text-xs text-gray-500">Out of 100</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
              <Star className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">{insights.loyaltyLevel}</p>
            <p className="text-xs text-gray-500">Loyalty Level</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-yellow-600">{insights.predictions.churnRisk}%</span>
            </div>
            <p className="text-sm font-medium text-gray-900">Churn Risk</p>
            <p className="text-xs text-gray-500">Next 90 days</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-gray-900">${insights.predictions.lifetimeValue}</p>
            <p className="text-xs text-gray-500">Predicted LTV</p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">AI Recommendations</h4>
        
        <div className="space-y-4">
          {insights.recommendations.map((rec, index) => {
            const IconComponent = rec.icon;
            return (
              <div key={index} className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)}`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 ${rec.bgColor} rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`w-5 h-5 ${rec.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h5 className="text-sm font-semibold text-gray-900">{rec.title}</h5>
                      <span className={getPriorityBadge(rec.priority)}>
                        {rec.priority} priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    <p className="text-sm font-medium text-blue-600">{rec.action}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Behavior Patterns */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Behavior Patterns</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.patterns.map((pattern, index) => {
            const IconComponent = pattern.icon;
            return (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h5 className="text-sm font-semibold text-gray-900">{pattern.title}</h5>
                      <span className="text-lg font-bold text-gray-900">{pattern.value}</span>
                    </div>
                    <p className="text-xs text-gray-600">{pattern.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Predictions */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Predictions</h4>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Next Order Prediction</p>
              <p className="text-xs text-gray-600">
                Expected: {new Date(insights.predictions.nextOrderDate).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-blue-600">{insights.predictions.nextOrderProbability}%</p>
              <p className="text-xs text-gray-600">Probability</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-900">Customer Lifetime Value</p>
              <p className="text-xs text-gray-600">Projected over 2 years</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">${insights.predictions.lifetimeValue}</p>
              <p className="text-xs text-gray-600">Estimated</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInsights;
