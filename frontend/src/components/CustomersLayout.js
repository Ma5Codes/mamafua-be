import React, { useState, useMemo } from 'react';
import CustomersHeader from './CustomersHeader';
import CustomerSearch from './CustomerSearch';
import CustomerTable from './CustomerTable';
import AddCustomerModal from './AddCustomerModal';
import CustomerDetailLayout from './CustomerDetailLayout';

const CustomersLayout = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'detail'
  const [customers, setCustomers] = useState([
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
  ]);

  // Filter customers based on search term
  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers;
    
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [customers, searchTerm]);

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setIsModalOpen(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setIsModalOpen(true);
  };

  const handleViewCustomer = (customer) => {
    setSelectedCustomer(customer);
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setSelectedCustomer(null);
    setCurrentView('list');
  };

  const handleDeleteCustomer = (customer) => {
    if (window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
      setCustomers(prev => prev.filter(c => c.id !== customer.id));
    }
  };

  const handleSaveCustomer = async (customerData) => {
    try {
      if (editingCustomer) {
        // Update existing customer
        setCustomers(prev => prev.map(c => 
          c.id === editingCustomer.id 
            ? { ...c, ...customerData }
            : c
        ));
      } else {
        // Add new customer
        const newCustomer = {
          id: Math.max(...customers.map(c => c.id)) + 1,
          ...customerData
        };
        setCustomers(prev => [...prev, newCustomer]);
      }
      
      // TODO: Replace with actual API call
      // await customerAPI.create(customerData) or customerAPI.update(id, customerData)
      
    } catch (error) {
      console.error('Error saving customer:', error);
      throw error;
    }
  };

  const handleCustomerUpdate = async (customerId, customerData) => {
    try {
      // Update customer in the list
      setCustomers(prev => prev.map(c =>
        c.id === customerId
          ? { ...c, ...customerData }
          : c
      ));

      // Update selected customer if it's the one being edited
      if (selectedCustomer && selectedCustomer.id === customerId) {
        setSelectedCustomer({ ...selectedCustomer, ...customerData });
      }

      // TODO: Replace with actual API call
      // await customerAPI.update(customerId, customerData)

    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  };

  const handleCustomerDelete = (customer) => {
    setCustomers(prev => prev.filter(c => c.id !== customer.id));
    // TODO: Replace with actual API call
    // await customerAPI.delete(customer.id)
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
  };

  // Render customer detail view
  if (currentView === 'detail' && selectedCustomer) {
    return (
      <CustomerDetailLayout
        customer={selectedCustomer}
        onBack={handleBackToList}
        onCustomerUpdate={handleCustomerUpdate}
        onCustomerDelete={handleCustomerDelete}
      />
    );
  }

  // Render customer list view
  return (
    <div className="p-8">
      {/* Page Header */}
      <CustomersHeader onAddCustomer={handleAddCustomer} />

      {/* Search Bar */}
      <CustomerSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search customers"
      />

      {/* Customer Table */}
      <CustomerTable
        customers={filteredCustomers}
        onViewCustomer={handleViewCustomer}
        onEditCustomer={handleEditCustomer}
        onDeleteCustomer={handleDeleteCustomer}
      />

      {/* Add/Edit Customer Modal */}
      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCustomer}
        customer={editingCustomer}
      />
    </div>
  );
};

export default CustomersLayout;
