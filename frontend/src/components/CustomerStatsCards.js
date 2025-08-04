import React from 'react';
import { ShoppingBag, DollarSign, Package, Clock } from 'lucide-react';

const CustomerStatsCards = ({ customerId }) => {
  // Mock customer statistics - in real app, this would come from API
  const customerStats = {
    totalOrders: 24,
    totalSpent: 1250.00,
    totalWeight: 85.5,
    avgOrderValue: 52.08,
    lastOrderDays: 5,
    favoriteService: 'Wash & Fold'
  };

  const statsData = [
    {
      id: 'orders',
      title: 'Total Orders',
      value: customerStats.totalOrders,
      icon: ShoppingBag,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      change: '+3 this month'
    },
    {
      id: 'spent',
      title: 'Total Spent',
      value: `$${customerStats.totalSpent.toFixed(2)}`,
      icon: DollarSign,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      change: '+$180 this month'
    },
    {
      id: 'weight',
      title: 'Total Weight',
      value: `${customerStats.totalWeight} kg`,
      icon: Package,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      change: '+12 kg this month'
    },
    {
      id: 'average',
      title: 'Avg Order Value',
      value: `$${customerStats.avgOrderValue.toFixed(2)}`,
      icon: DollarSign,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      change: '+$5.20 vs last month'
    }
  ];

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Statistics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const IconComponent = stat.icon;
          
          return (
            <div key={stat.id} className="bg-white rounded-xl p-6 border border-gray-200">
              {/* Header with title and icon */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                </div>
                <div className={`w-10 h-10 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                  <IconComponent className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>

              {/* Value and change */}
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-green-500 text-sm font-medium">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Last Order */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Last Order</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {customerStats.lastOrderDays} days ago
            </p>
            <p className="text-gray-500 text-sm">August 1, 2024</p>
          </div>
        </div>

        {/* Favorite Service */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm font-medium">Favorite Service</p>
            </div>
            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {customerStats.favoriteService}
            </p>
            <p className="text-gray-500 text-sm">Used 15 times</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerStatsCards;
