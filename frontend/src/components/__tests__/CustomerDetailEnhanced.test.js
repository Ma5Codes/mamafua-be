import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

describe('Enhanced Customer Detail Layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all tabs correctly', () => {
    render(<CustomerDetailLayout {...mockProps} />);
    
    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Analytics')).toBeInTheDocument();
    expect(screen.getByText('AI Insights')).toBeInTheDocument();
    expect(screen.getByText('Contact Customer')).toBeInTheDocument();
  });

  test('switches between tabs correctly', () => {
    render(<CustomerDetailLayout {...mockProps} />);
    
    // Should start on Overview tab
    expect(screen.getByText('Customer Information')).toBeInTheDocument();
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
    
    // Switch to Analytics tab
    fireEvent.click(screen.getByText('Analytics'));
    expect(screen.getByText('Customer Analytics')).toBeInTheDocument();
    expect(screen.getByText('Monthly Spending Trend')).toBeInTheDocument();
    
    // Switch to AI Insights tab
    fireEvent.click(screen.getByText('AI Insights'));
    expect(screen.getByText('Customer Intelligence')).toBeInTheDocument();
    expect(screen.getByText('AI Recommendations')).toBeInTheDocument();
  });

  test('opens communication modal', () => {
    render(<CustomerDetailLayout {...mockProps} />);
    
    fireEvent.click(screen.getByText('Contact Customer'));
    
    expect(screen.getByText('Contact Sophia Clark')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('SMS')).toBeInTheDocument();
  });

  test('transaction detail modal opens from transaction history', async () => {
    render(<CustomerDetailLayout {...mockProps} />);
    
    // Find and click a View button in transaction history
    const viewButtons = screen.getAllByText('View');
    fireEvent.click(viewButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByText('Transaction Details')).toBeInTheDocument();
    });
  });

  test('advanced filters work in transaction history', () => {
    render(<CustomerDetailLayout {...mockProps} />);
    
    // Should show advanced filters
    expect(screen.getByText('Advanced Filters')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search transactions by order ID, service, or amount...')).toBeInTheDocument();
  });

  test('analytics shows customer metrics', () => {
    render(<CustomerDetailLayout {...mockProps} />);
    
    // Switch to Analytics tab
    fireEvent.click(screen.getByText('Analytics'));
    
    expect(screen.getByText('Order Frequency')).toBeInTheDocument();
    expect(screen.getByText('Average Spend')).toBeInTheDocument();
    expect(screen.getByText('Service Preferences')).toBeInTheDocument();
  });

  test('AI insights shows recommendations', () => {
    render(<CustomerDetailLayout {...mockProps} />);
    
    // Switch to AI Insights tab
    fireEvent.click(screen.getByText('AI Insights'));
    
    expect(screen.getByText('Behavior Score')).toBeInTheDocument();
    expect(screen.getByText('AI Recommendations')).toBeInTheDocument();
    expect(screen.getByText('Predictions')).toBeInTheDocument();
  });
});
