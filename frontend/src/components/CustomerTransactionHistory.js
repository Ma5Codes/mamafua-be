import React, { useState } from 'react';
import { Calendar, Package, DollarSign, Eye } from 'lucide-react';
import TransactionDetailModal from './TransactionDetailModal';
import AdvancedTransactionFilters from './AdvancedTransactionFilters';

const CustomerTransactionHistory = ({ customerId, customerName }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // Mock transaction history - in real app, this would come from API
  const transactions = [
    {
      id: 'ORD-20240801-001',
      date: '2024-08-01',
      service: 'Wash & Fold',
      weight: 5.5,
      amount: 55.00,
      status: 'Completed',
      items: ['2 Shirts', '1 Pants', '3 T-shirts'],
      pickupDate: '2024-08-03',
      deliveryDate: '2024-08-03'
    },
    {
      id: 'ORD-20240725-002',
      date: '2024-07-25',
      service: 'Dry Cleaning',
      weight: 2.0,
      amount: 45.00,
      status: 'Completed',
      items: ['1 Suit', '2 Dress Shirts'],
      pickupDate: '2024-07-27',
      deliveryDate: '2024-07-27'
    },
    {
      id: 'ORD-20240720-003',
      date: '2024-07-20',
      service: 'Ironing',
      weight: 3.0,
      amount: 30.00,
      status: 'Completed',
      items: ['5 Shirts', '2 Pants'],
      pickupDate: '2024-07-22',
      deliveryDate: '2024-07-22'
    },
    {
      id: 'ORD-20240715-004',
      date: '2024-07-15',
      service: 'Wash & Fold',
      weight: 8.0,
      amount: 80.00,
      status: 'Completed',
      items: ['Family laundry'],
      pickupDate: '2024-07-17',
      deliveryDate: '2024-07-17'
    },
    {
      id: 'ORD-20240710-005',
      date: '2024-07-10',
      service: 'Express Wash',
      weight: 4.0,
      amount: 60.00,
      status: 'Completed',
      items: ['Urgent items'],
      pickupDate: '2024-07-11',
      deliveryDate: '2024-07-11'
    }
  ];

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    
    switch (status.toLowerCase()) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-700`;
      case 'in progress':
        return `${baseClasses} bg-blue-100 text-blue-700`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // Apply filters to transactions
    let filtered = [...transactions];

    if (newFilters.search) {
      filtered = filtered.filter(t =>
        t.id.toLowerCase().includes(newFilters.search.toLowerCase()) ||
        t.service.toLowerCase().includes(newFilters.search.toLowerCase()) ||
        t.amount.toString().includes(newFilters.search)
      );
    }

    if (newFilters.status) {
      filtered = filtered.filter(t => t.status.toLowerCase() === newFilters.status.toLowerCase());
    }

    if (newFilters.service) {
      filtered = filtered.filter(t => t.service.toLowerCase().includes(newFilters.service.toLowerCase()));
    }

    if (newFilters.dateRange.start) {
      filtered = filtered.filter(t => new Date(t.date) >= new Date(newFilters.dateRange.start));
    }

    if (newFilters.dateRange.end) {
      filtered = filtered.filter(t => new Date(t.date) <= new Date(newFilters.dateRange.end));
    }

    if (newFilters.amountRange.min) {
      filtered = filtered.filter(t => t.amount >= parseFloat(newFilters.amountRange.min));
    }

    if (newFilters.amountRange.max) {
      filtered = filtered.filter(t => t.amount <= parseFloat(newFilters.amountRange.max));
    }

    // Sort results
    filtered.sort((a, b) => {
      const aVal = a[newFilters.sortBy] || '';
      const bVal = b[newFilters.sortBy] || '';

      if (newFilters.sortOrder === 'desc') {
        return bVal > aVal ? 1 : -1;
      } else {
        return aVal > bVal ? 1 : -1;
      }
    });

    setFilteredTransactions(filtered);
  };

  const handleClearFilters = () => {
    setFilters({});
    setFilteredTransactions(transactions);
  };

  // Initialize filtered transactions
  React.useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  return (
    <div className="space-y-6">
      {/* Advanced Filters */}
      <AdvancedTransactionFilters
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      <div className="bg-white rounded-xl border border-gray-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>

            {/* Period Filter */}
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedPeriod('all')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === 'all'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Time
              </button>
              <button
                onClick={() => setSelectedPeriod('month')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === 'month'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                This Month
              </button>
              <button
                onClick={() => setSelectedPeriod('quarter')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedPeriod === 'quarter'
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Last 3 Months
              </button>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="divide-y divide-gray-200">
          {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              {/* Transaction Info */}
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-3">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {transaction.id}
                  </h4>
                  <span className={getStatusBadge(transaction.status)}>
                    {transaction.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{formatDate(transaction.date)}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Package className="w-4 h-4 mr-2" />
                    <span>{transaction.service} • {transaction.weight} kg</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>${transaction.amount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-500">
                  Items: {transaction.items.join(', ')}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleViewTransaction(transaction)}
                className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium ml-4"
              >
                <Eye className="w-4 h-4 mr-1" />
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </span>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View All Transactions →
            </button>
          </div>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        transaction={selectedTransaction}
      />
    </div>
  );
};

export default CustomerTransactionHistory;
