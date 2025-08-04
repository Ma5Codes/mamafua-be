import React, { useState } from 'react';
import { Edit, Eye, Trash2, ChevronDown, Calendar } from 'lucide-react';
import Header from './Header';
import StatusBadge from './StatusBadge';
import Pagination from './Pagination';

const TransactionsScreen = ({ onNavigate }) => {
  const [selectedStatus, setSelectedStatus] = useState('Status');
  const [selectedDate, setSelectedDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock transaction data matching the Figma design
  const transactions = [
    {
      id: '#12345',
      customerName: 'Sophia Clark',
      date: '2024-07-26',
      status: 'pending',
      totalAmount: '$26.00'
    },
    {
      id: '#12346',
      customerName: 'Ethan Miller',
      date: '2024-07-25',
      status: 'in-progress',
      totalAmount: '$30.00'
    },
    {
      id: '#12348',
      customerName: 'Liam Wilson',
      date: '2024-07-24',
      status: 'ready',
      totalAmount: '$35.00'
    },
    {
      id: '#12349',
      customerName: 'Ava Martinez',
      date: '2024-07-22',
      status: 'paid',
      totalAmount: '$40.00'
    }
  ];

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    // Here you would typically filter the transactions
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    // Here you would typically filter by date
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Here you would typically fetch new data
  };

  const handleNewTransaction = () => {
    // Handle new transaction creation
    console.log('New transaction clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header onNewTransaction={handleNewTransaction} />

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Page Header */}
          <div className="px-6 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
                <p className="text-gray-600 text-sm mt-1">Manage all laundry transactions efficiently.</p>
              </div>
              
              {/* Filters */}
              <div className="flex items-center space-x-3">
                {/* Status Filter */}
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="Status">Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="ready">Ready</option>
                    <option value="paid">Paid</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Date Filter */}
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    placeholder="mm/dd/yyyy"
                    className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaction, index) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={transaction.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.totalAmount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={handlePageChange}
            showingFrom={1}
            showingTo={10}
            totalResults={97}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionsScreen;
