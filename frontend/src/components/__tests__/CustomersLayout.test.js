import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomersLayout from '../CustomersLayout';

describe('CustomersLayout', () => {
  test('renders customers page components', () => {
    render(<CustomersLayout />);
    
    // Check if main components are rendered
    expect(screen.getByText('Customers')).toBeInTheDocument();
    expect(screen.getByText('Add Customer')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search customers')).toBeInTheDocument();
  });

  test('renders customer table with data', () => {
    render(<CustomersLayout />);
    
    // Check table headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
    
    // Check sample data
    expect(screen.getByText('Sophia Clark')).toBeInTheDocument();
    expect(screen.getByText('Liam Walker')).toBeInTheDocument();
    expect(screen.getByText('sophia.clark@example.com')).toBeInTheDocument();
  });

  test('search functionality works', () => {
    render(<CustomersLayout />);
    
    const searchInput = screen.getByPlaceholderText('Search customers');
    fireEvent.change(searchInput, { target: { value: 'Sophia' } });
    
    // Should show Sophia Clark
    expect(screen.getByText('Sophia Clark')).toBeInTheDocument();
    // Should not show Liam Walker
    expect(screen.queryByText('Liam Walker')).not.toBeInTheDocument();
  });

  test('add customer modal opens', () => {
    render(<CustomersLayout />);
    
    const addButton = screen.getByText('Add Customer');
    fireEvent.click(addButton);
    
    // Modal should open
    expect(screen.getByText('Add New Customer')).toBeInTheDocument();
  });
});
