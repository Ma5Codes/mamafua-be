import React, { useState } from 'react';
import CustomerDetailHeader from './CustomerDetailHeader';
import CustomerInfoCard from './CustomerInfoCard';
import CustomerStatsCards from './CustomerStatsCards';
import CustomerTransactionHistory from './CustomerTransactionHistory';
import AddCustomerModal from './AddCustomerModal';
import CustomerAnalytics from './CustomerAnalytics';
import CustomerCommunication from './CustomerCommunication';
import CustomerInsights from './CustomerInsights';

const CustomerDetailLayout = ({ customer, onBack, onCustomerUpdate, onCustomerDelete }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [isCommunicationOpen, setIsCommunicationOpen] = useState(false);

  if (!customer) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-500">
          <h2 className="text-xl font-semibold mb-2">Customer Not Found</h2>
          <p>The customer you're looking for doesn't exist.</p>
          <button
            onClick={onBack}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Customers
          </button>
        </div>
      </div>
    );
  }

  const handleEdit = (customer) => {
    setIsEditModalOpen(true);
  };

  const handleDelete = (customer) => {
    if (window.confirm(`Are you sure you want to delete ${customer.name}? This action cannot be undone.`)) {
      onCustomerDelete(customer);
      onBack(); // Navigate back to customers list
    }
  };

  const handleSaveCustomer = async (customerData) => {
    try {
      // Update the customer
      await onCustomerUpdate(customer.id, customerData);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <CustomerDetailHeader
        customer={customer}
        onBack={onBack}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Stats Cards */}
      <CustomerStatsCards customerId={customer.id} />

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('insights')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'insights'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              AI Insights
            </button>
            <button
              onClick={() => setIsCommunicationOpen(true)}
              className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 font-medium text-sm"
            >
              Contact Customer
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Info - Takes 1 column */}
          <div className="lg:col-span-1">
            <CustomerInfoCard customer={customer} />
          </div>

          {/* Transaction History - Takes 2 columns */}
          <div className="lg:col-span-2">
            <CustomerTransactionHistory
              customerId={customer.id}
              customerName={customer.name}
            />
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <CustomerAnalytics
          customerId={customer.id}
          customerName={customer.name}
        />
      )}

      {activeTab === 'insights' && (
        <CustomerInsights customer={customer} />
      )}

      {/* Communication Modal */}
      {isCommunicationOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <CustomerCommunication
              customer={customer}
              onClose={() => setIsCommunicationOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      <AddCustomerModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCustomer}
        customer={customer}
      />
    </div>
  );
};

export default CustomerDetailLayout;
