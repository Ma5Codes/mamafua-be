import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
      case 'belum-bayar':
        return {
          bg: 'bg-orange-500',
          text: 'text-white',
          label: 'Pending'
        };
      case 'in-progress':
      case 'processing':
        return {
          bg: 'bg-blue-500',
          text: 'text-white',
          label: 'In Progress'
        };
      case 'ready':
      case 'completed':
        return {
          bg: 'bg-green-500',
          text: 'text-white',
          label: 'Ready'
        };
      case 'paid':
      case 'lunas':
        return {
          bg: 'bg-green-600',
          text: 'text-white',
          label: 'Paid'
        };
      case 'bayar-sebagian':
      case 'partial':
        return {
          bg: 'bg-yellow-500',
          text: 'text-white',
          label: 'Partial'
        };
      default:
        return {
          bg: 'bg-gray-500',
          text: 'text-white',
          label: status || 'Unknown'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
};

export default StatusBadge;
