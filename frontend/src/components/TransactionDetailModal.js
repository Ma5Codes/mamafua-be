import React from 'react';
import { X, Calendar, User, Package, DollarSign, MapPin, Clock, FileText, Printer, Download } from 'lucide-react';

const TransactionDetailModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen || !transaction) return null;

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // TODO: Implement PDF download
    alert('PDF download functionality will be implemented');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-bold text-gray-900">Transaction Details</h2>
            <span className={getStatusBadge(transaction.status)}>
              {transaction.status}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Print"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download PDF"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Transaction Info */}
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order ID</p>
                      <p className="text-sm text-gray-600">{transaction.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order Date</p>
                      <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Customer</p>
                      <p className="text-sm text-gray-600">{transaction.customer || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Package className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Service</p>
                      <p className="text-sm text-gray-600">{transaction.service}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mt-1.5 mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order Placed</p>
                      <p className="text-xs text-gray-500">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                  {transaction.pickupDate && (
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mt-1.5 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Picked Up</p>
                        <p className="text-xs text-gray-500">{formatDate(transaction.pickupDate)}</p>
                      </div>
                    </div>
                  )}
                  {transaction.deliveryDate && (
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5 mr-3"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Delivered</p>
                        <p className="text-xs text-gray-500">{formatDate(transaction.deliveryDate)}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Items & Payment */}
            <div className="space-y-6">
              {/* Items */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Items</h3>
                <div className="space-y-2">
                  {transaction.items && transaction.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                      <span className="text-sm text-gray-900">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">Total Weight</span>
                    <span className="text-sm text-gray-600">{transaction.weight} kg</span>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm text-gray-900">${(transaction.amount * 0.9).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tax (10%)</span>
                    <span className="text-sm text-gray-900">${(transaction.amount * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${transaction.amount.toFixed(2)}</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-sm text-gray-600">Payment Method: </span>
                    <span className="text-sm font-medium text-gray-900">Credit Card</span>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Payment Status: </span>
                    <span className="text-sm font-medium text-green-600">Paid</span>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Instructions</h3>
                <p className="text-sm text-gray-600">
                  {transaction.instructions || 'No special instructions provided.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailModal;
