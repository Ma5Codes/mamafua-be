import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomerDetailLayout from '../CustomerDetailLayout';

const mockCustomer = {
  id: 1,
  name: 'Sophia Clark',
  phone: '555-123-4567',
  email: 'sophia.clark@example.com',
  address: '123 Main St, Anytown'
};

const mockProps = {
  customer: mockCustomer,
  onBack: jest.fn(),
  onCustomerUpdate: jest.fn(),
  onCustomerDelete: jest.fn()
};

describe('CustomerDetailLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders customer detail page components', () => {
    render(<CustomerDetailLayout {...mockProps} />);
    
    // Check if main components are rendered
    expect(screen.getByText('Sophia Clark')).toBeInTheDocument();
    expect(screen.getByText('sophia.clark@example.com')).toBeInTheDocument();
    expect(screen.getByText('555-123-4567')).toBeInTheDocument();
    expect(screen.getByText('Customer Statistics')).toBeInTheDocument();
    expect(screen.getByText('Customer Information')).toBeInTheDocument();
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
  });

  test('renders customer stats cards', () => {
    render(<CustomerDetailLayout {...mockProps} />);
    
    expect(screen.getByText('Total Orders')).toBeInTheDocument();
    expect(screen.getByText('Total Spent')).toBeInTheDocument();
    expect(screen.getByText('Total Weight')).toBeInTheDocument();
    expect(screen.getByText('Avg Order Value')).toBeInTheDocument();
  });

  test('renders transaction history', () => {
    render(<CustomerDetailLayout {...mockProps} />);
    
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
    expect(screen.getByText('All Time')).toBeInTheDocument();
    expect(screen.getByText('This Month')).toBeInTheDocument();
  });

  test('back button works', () => {
    render(<CustomerDetailLayout {...mockProps} />);
    
    const backButton = screen.getByText('Back to Customers');
    fireEvent.click(backButton);
    
    expect(mockProps.onBack).toHaveBeenCalledTimes(1);
  });

  test('edit button opens modal', () => {
    render(<CustomerDetailLayout {...mockProps} />);
    
    const editButton = screen.getByText('Edit Customer');
    fireEvent.click(editButton);
    
    // Modal should open
    expect(screen.getByText('Edit Customer')).toBeInTheDocument();
  });

  test('handles customer not found', () => {
    render(<CustomerDetailLayout {...mockProps} customer={null} />);
    
    expect(screen.getByText('Customer Not Found')).toBeInTheDocument();
    expect(screen.getByText("The customer you're looking for doesn't exist.")).toBeInTheDocument();
  });
});
