import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ReportsLayout from '../ReportsLayout';

describe('ReportsLayout', () => {
  test('renders reports page components', () => {
    render(<ReportsLayout />);
    
    // Check if main components are rendered
    expect(screen.getByText('Reports')).toBeInTheDocument();
    expect(screen.getByText('Generate custom reports for your laundry business')).toBeInTheDocument();
    expect(screen.getByText('Custom Reports')).toBeInTheDocument();
    expect(screen.getByText('Revenue Overview')).toBeInTheDocument();
    expect(screen.getByText('Transaction Summary')).toBeInTheDocument();
  });

  test('renders export buttons', () => {
    render(<ReportsLayout />);
    
    expect(screen.getByText('Export CSV')).toBeInTheDocument();
    expect(screen.getByText('Export PDF')).toBeInTheDocument();
  });

  test('renders transaction table with data', () => {
    render(<ReportsLayout />);
    
    // Check table headers
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Customer')).toBeInTheDocument();
    expect(screen.getByText('Order ID')).toBeInTheDocument();
    expect(screen.getByText('Service')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
    
    // Check sample data
    expect(screen.getByText('Sarah Wilson')).toBeInTheDocument();
    expect(screen.getByText('Liam Carter')).toBeInTheDocument();
  });

  test('generate report button works', () => {
    render(<ReportsLayout />);
    
    const generateButton = screen.getByText('Generate Report');
    fireEvent.click(generateButton);
    
    // Should not throw any errors
    expect(generateButton).toBeInTheDocument();
  });
});
