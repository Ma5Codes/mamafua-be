import React from 'react';
import { ArrowLeft, Edit, Trash2, Phone, Mail } from 'lucide-react';

const CustomerDetailHeader = ({ customer, onBack, onEdit, onDelete }) => {
  if (!customer) return null;

  return (
    <div className="mb-8">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Customers
      </button>

      {/* Header Content */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          {/* Customer Avatar */}
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-semibold text-blue-600">
              {customer.name.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Customer Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {customer.name}
            </h1>
            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>{customer.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onEdit(customer)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Customer
          </button>
          <button
            onClick={() => onDelete(customer)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailHeader;
