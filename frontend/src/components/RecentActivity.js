import React from 'react';
import { CheckCircle, UserPlus, Clock } from 'lucide-react';

const RecentActivity = ({ activities }) => {
  // Default activities matching the Figma design
  const defaultActivities = [
    {
      id: 1,
      type: 'completed',
      title: 'Transaction #520: Completed',
      detail: '10 kg, $80',
      icon: CheckCircle,
      iconColor: 'text-green-500',
      iconBg: 'bg-green-50'
    },
    {
      id: 2,
      type: 'customer',
      title: 'New Customer: Sarah Miller',
      detail: 'Joined 2 hours ago',
      icon: UserPlus,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50'
    },
    {
      id: 3,
      type: 'progress',
      title: 'Transaction #519: In Progress',
      detail: '5 kg, $40',
      icon: Clock,
      iconColor: 'text-yellow-500',
      iconBg: 'bg-yellow-50'
    }
  ];

  const activityList = activities || defaultActivities;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {activityList.map((activity) => {
          const IconComponent = activity.icon;
          
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              {/* Icon */}
              <div className={`w-8 h-8 ${activity.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                <IconComponent className={`w-4 h-4 ${activity.iconColor}`} />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 leading-tight">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {activity.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Link */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View all activities →
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
