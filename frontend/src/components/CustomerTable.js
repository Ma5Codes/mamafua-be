import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

const CustomerTable = ({ customers, onViewCustomer, onEditCustomer, onDeleteCustomer }) => {
  // Default customer data matching Figma design
  const defaultCustomers = [
    {
      id: 1,
      name: 'Sophia Clark',
      phone: '555-123-4567',
      email: 'sophia.clark@example.com',
      address: '123 Main St, Anytown'
    },
    {
      id: 2,
      name: 'Liam Walker',
      phone: '555-987-6543',
      email: 'liam.walker@example.com',
      address: '456 Oak Ave, Anytown'
    },
    {
      id: 3,
      name: 'Olivia Carter',
      phone: '555-246-8013',
      email: 'olivia.carter@example.com',
      address: '789 Pine Ln, Anytown'
    },
    {
      id: 4,
      name: 'Noah Bennett',
      phone: '555-369-1470',
      email: 'noah.bennett@example.com',
      address: '321 Elm Rd, Anytown'
    },
    {
      id: 5,
      name: 'Ava Foster',
      phone: '555-159-2638',
      email: 'ava.foster@example.com',
      address: '654 Maple Dr, Anytown'
    },
    {
      id: 6,
      name: 'Ethan Hayes',
      phone: '555-753-9512',
      email: 'ethan.hayes@example.com',
      address: '987 Cedar Ct, Anytown'
    },
    {
      id: 7,
      name: 'Isabella Reed',
      phone: '555-864-2109',
      email: 'isabella.reed@example.com',
      address: '147 Birch Pl, Anytown'
    },
    {
      id: 8,
      name: 'Jackson Cooper',
      phone: '555-975-3186',
      email: 'jackson.cooper@example.com',
      address: '258 Willow Way, Anytown'
    }
  ];

  const customerData = customers || defaultCustomers;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customerData.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {customer.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {customer.phone}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {customer.email}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {customer.address}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onViewCustomer && onViewCustomer(customer)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="View Customer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEditCustomer && onEditCustomer(customer)}
                      className="text-gray-600 hover:text-gray-800 transition-colors"
                      title="Edit Customer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteCustomer && onDeleteCustomer(customer)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete Customer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
