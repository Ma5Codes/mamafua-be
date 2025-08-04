import React, { useState } from 'react';
import ReportsHeader from './ReportsHeader';
import CustomReports from './CustomReports';
import RevenueOverview from './RevenueOverview';
import TransactionSummary from './TransactionSummary';

const ReportsLayout = () => {
  const [reportData, setReportData] = useState({
    totalRevenue: 12500,
    changePercent: '+15%',
    period: 'Last 30 Days',
    transactions: null // Will use default data from TransactionSummary
  });

  const handleGenerateReport = (dateRange) => {
    console.log('Generating report for date range:', dateRange);
    
    // TODO: Replace with actual API call
    // Example: 
    // const data = await transactionAPI.getRecapByDate(dateRange.startDate, dateRange.endDate);
    // setReportData(data);
    
    // For now, simulate report generation
    setReportData(prev => ({
      ...prev,
      period: `${dateRange.startDate} - ${dateRange.endDate}`,
      // You can update other data here based on the date range
    }));
  };

  const handleExportCSV = () => {
    console.log('Exporting CSV...');
    
    // TODO: Implement CSV export functionality
    // Example implementation:
    const csvData = [
      ['Date', 'Customer', 'Order ID', 'Service', 'Amount', 'Status'],
      ['2024.08.05', 'Sarah Wilson', 'ORD-20240805-001', 'Wash & Fold', '$50.00', 'Completed'],
      ['2024.08.04', 'Liam Carter', 'ORD-20240804-003', 'Dry Cleaning', '$75.00', 'Completed'],
      // Add more data...
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction-summary.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    console.log('Exporting PDF...');
    
    // TODO: Implement PDF export functionality
    // You might want to use a library like jsPDF or html2pdf
    alert('PDF export functionality will be implemented with a PDF library');
  };

  return (
    <div className="p-8">
      {/* Page Header */}
      <ReportsHeader />

      {/* Custom Reports Section */}
      <CustomReports onGenerateReport={handleGenerateReport} />

      {/* Revenue Overview Chart */}
      <RevenueOverview 
        totalRevenue={reportData.totalRevenue}
        changePercent={reportData.changePercent}
        period={reportData.period}
      />

      {/* Transaction Summary Table */}
      <TransactionSummary 
        transactions={reportData.transactions}
        onExportCSV={handleExportCSV}
        onExportPDF={handleExportPDF}
      />
    </div>
  );
};

export default ReportsLayout;
