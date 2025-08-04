import React from 'react';
import { User, Phone, Mail, MapPin, Calendar, CreditCard } from 'lucide-react';

const CustomerInfoCard = ({ customer }) => {
  if (!customer) return null;

  // Mock additional customer data
  const customerDetails = {
    ...customer,
    joinDate: '2024-01-15',
    lastOrder: '2024-08-01',
    preferredService: 'Wash & Fold',
    paymentMethod: 'Credit Card',
    notes: 'Prefers eco-friendly detergent. Usually picks up on weekends.'
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
            Personal Details
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <User className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Full Name</p>
                <p className="text-sm text-gray-600">{customerDetails.name}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Phone Number</p>
                <p className="text-sm text-gray-600">{customerDetails.phone}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Email Address</p>
                <p className="text-sm text-gray-600">{customerDetails.email}</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Address</p>
                <p className="text-sm text-gray-600">{customerDetails.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wider">
            Account Details
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Join Date</p>
                <p className="text-sm text-gray-600">{formatDate(customerDetails.joinDate)}</p>
              </div>
            </div>

            <div className="flex items-start">
              <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Last Order</p>
                <p className="text-sm text-gray-600">{formatDate(customerDetails.lastOrder)}</p>
              </div>
            </div>

            <div className="flex items-start">
              <User className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Preferred Service</p>
                <p className="text-sm text-gray-600">{customerDetails.preferredService}</p>
              </div>
            </div>

            <div className="flex items-start">
              <CreditCard className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">Payment Method</p>
                <p className="text-sm text-gray-600">{customerDetails.paymentMethod}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      {customerDetails.notes && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wider mb-3">
            Notes
          </h4>
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            {customerDetails.notes}
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomerInfoCard;
