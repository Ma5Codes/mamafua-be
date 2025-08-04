import React from 'react';
import { Package, DollarSign, FileText, Users } from 'lucide-react';

const StatsCards = ({ stats }) => {
  const cardData = [
    {
      id: 'weight',
      title: 'Total Weight',
      subtitle: '(kg)',
      value: stats?.totalWeight?.value || 1250,
      change: stats?.totalWeight?.change || '+10%',
      icon: Package,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 'revenue',
      title: 'Total Revenue',
      subtitle: '($)',
      value: stats?.totalRevenue?.value || 8750,
      change: stats?.totalRevenue?.change || '+18%',
      icon: DollarSign,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      id: 'transactions',
      title: 'Transactions',
      subtitle: '',
      value: stats?.transactions?.value || 520,
      change: stats?.transactions?.change || '+12%',
      icon: FileText,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      id: 'customers',
      title: 'Customers',
      subtitle: '',
      value: stats?.customers?.value || 210,
      change: stats?.customers?.change || '+5%',
      icon: Users,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardData.map((card) => {
        const IconComponent = card.icon;
        
        return (
          <div key={card.id} className="bg-white rounded-xl p-6 border border-gray-200">
            {/* Header with title and icon */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                {card.subtitle && (
                  <p className="text-gray-400 text-xs">{card.subtitle}</p>
                )}
              </div>
              <div className={`w-10 h-10 ${card.iconBg} rounded-lg flex items-center justify-center`}>
                <IconComponent className={`w-5 h-5 ${card.iconColor}`} />
              </div>
            </div>

            {/* Value and change */}
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                </p>
                <p className="text-green-500 text-sm font-medium mt-1">{card.change}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
