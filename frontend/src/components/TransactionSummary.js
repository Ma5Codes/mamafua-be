import React from 'react';
import { Download, FileText } from 'lucide-react';

const TransactionSummary = ({ transactions, onExportCSV, onExportPDF }) => {
  // Default transaction data matching Figma design
  const defaultTransactions = [
    {
      id: 1,
      date: '2024.08.05',
      customer: 'Sarah Wilson',
      orderId: 'ORD-20240805-001',
      service: 'Wash & Fold',
      amount: 50.00,
      status: 'Completed'
    },
    {
      id: 2,
      date: '2024.08.04',
      customer: 'Liam Carter',
      orderId: 'ORD-20240804-003',
      service: 'Dry Cleaning',
      amount: 75.00,
      status: 'Completed'
    },
    {
      id: 3,
      date: '2024.08.03',
      customer: 'Ava Bennett',
      orderId: 'ORD-20240803-003',
      service: 'Ironing',
      amount: 30.00,
      status: 'Completed'
    },
    {
      id: 4,
      date: '2024.08.02',
      customer: 'Noah Foster',
      orderId: 'ORD-20240802-004',
      service: 'Wash & Fold',
      amount: 55.00,
      status: 'Completed'
    },
    {
      id: 5,
      date: '2024.08.01',
      customer: 'Isabella Hayes',
      orderId: 'ORD-20240801-005',
      service: 'Dry Cleaning',
      amount: 80.00,
      status: 'Completed'
    }
  ];

  const transactionData = transactions || defaultTransactions;

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium";
    
    switch (status.toLowerCase()) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-700`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-700`;
      case 'cancelled':
        return `${baseClasses} bg-red-100 text-red-700`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-700`;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Transaction Summary</h3>
          
          {/* Export Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onExportCSV}
              className="flex items-center px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
            >
              <FileText className="w-4 h-4 mr-2" />
              Export CSV
            </button>
            <button
              onClick={onExportPDF}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactionData.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.customer}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {transaction.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.service}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(transaction.status)}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionSummary;
