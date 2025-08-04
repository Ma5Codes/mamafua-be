import React from 'react';
import { 
  Home, 
  FileText, 
  Users, 
  BarChart3, 
  Settings,
  Package
} from 'lucide-react';

const Sidebar = ({ currentScreen, onNavigate }) => {
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      screen: 'dashboard'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: FileText,
      screen: 'transactions'
    },
    {
      id: 'customers',
      label: 'Customers',
      icon: Users,
      screen: 'customers'
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart3,
      screen: 'reports'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      screen: 'settings'
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <span className="ml-3 text-lg font-semibold text-gray-900">Laundry Co.</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentScreen === item.screen;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.screen)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <IconComponent className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
