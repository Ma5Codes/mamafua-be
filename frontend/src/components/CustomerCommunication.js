import React, { useState } from 'react';
import { Mail, MessageSquare, Phone, Send, FileText, History, X } from 'lucide-react';

const CustomerCommunication = ({ customer, onClose }) => {
  const [activeTab, setActiveTab] = useState('email');
  const [emailData, setEmailData] = useState({
    subject: '',
    message: '',
    template: ''
  });
  const [smsData, setSmsData] = useState({
    message: '',
    template: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Email templates
  const emailTemplates = [
    {
      id: 'order_ready',
      name: 'Order Ready for Pickup',
      subject: 'Your laundry order is ready for pickup!',
      message: `Hi ${customer?.name || '[Customer Name]'},\n\nGreat news! Your laundry order is now ready for pickup.\n\nOrder Details:\n- Order ID: [Order ID]\n- Service: [Service Type]\n- Total: $[Amount]\n\nYou can pick up your order during our business hours:\nMonday - Friday: 8:00 AM - 7:00 PM\nSaturday: 9:00 AM - 5:00 PM\n\nThank you for choosing our laundry service!\n\nBest regards,\nLaundry Co. Team`
    },
    {
      id: 'order_delayed',
      name: 'Order Delay Notification',
      subject: 'Update on your laundry order',
      message: `Hi ${customer?.name || '[Customer Name]'},\n\nWe wanted to update you on your recent laundry order.\n\nDue to high demand, your order will be ready for pickup tomorrow instead of today. We apologize for any inconvenience this may cause.\n\nAs an apology, we're offering you a 10% discount on your next order.\n\nThank you for your patience and understanding.\n\nBest regards,\nLaundry Co. Team`
    },
    {
      id: 'promotional',
      name: 'Promotional Offer',
      subject: 'Special offer just for you!',
      message: `Hi ${customer?.name || '[Customer Name]'},\n\nWe have a special offer just for our valued customers!\n\nGet 20% off your next dry cleaning service when you book before the end of this month.\n\nUse code: SAVE20\n\nThis offer is valid until [Date] and can be used for any dry cleaning service.\n\nBook now to take advantage of this limited-time offer!\n\nBest regards,\nLaundry Co. Team`
    }
  ];

  // SMS templates
  const smsTemplates = [
    {
      id: 'pickup_reminder',
      name: 'Pickup Reminder',
      message: `Hi ${customer?.name || '[Customer Name]'}! Your laundry order [Order ID] is ready for pickup. We're open until 7 PM today. - Laundry Co.`
    },
    {
      id: 'order_received',
      name: 'Order Confirmation',
      message: `Thanks ${customer?.name || '[Customer Name]'}! We've received your laundry order [Order ID]. It will be ready by [Date]. - Laundry Co.`
    },
    {
      id: 'delivery_complete',
      name: 'Delivery Complete',
      message: `Hi ${customer?.name || '[Customer Name]'}! Your laundry has been delivered. Thank you for choosing Laundry Co.!`
    }
  ];

  const handleEmailTemplateSelect = (template) => {
    setEmailData({
      subject: template.subject,
      message: template.message,
      template: template.id
    });
  };

  const handleSmsTemplateSelect = (template) => {
    setSmsData({
      message: template.message,
      template: template.id
    });
  };

  const handleSendEmail = async () => {
    if (!emailData.subject || !emailData.message) {
      alert('Please fill in both subject and message');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Sending email:', {
        to: customer.email,
        subject: emailData.subject,
        message: emailData.message
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Email sent successfully!');
      setEmailData({ subject: '', message: '', template: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendSms = async () => {
    if (!smsData.message) {
      alert('Please enter a message');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Sending SMS:', {
        to: customer.phone,
        message: smsData.message
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('SMS sent successfully!');
      setSmsData({ message: '', template: '' });
    } catch (error) {
      console.error('Error sending SMS:', error);
      alert('Failed to send SMS. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Contact {customer?.name}
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('email')}
          className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'email'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Mail className="w-4 h-4 mr-2" />
          Email
        </button>
        <button
          onClick={() => setActiveTab('sms')}
          className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'sms'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          SMS
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'history'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <History className="w-4 h-4 mr-2" />
          History
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Email Tab */}
        {activeTab === 'email' && (
          <div className="space-y-6">
            {/* Templates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Email Templates
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {emailTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleEmailTemplateSelect(template)}
                    className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center mb-2">
                      <FileText className="w-4 h-4 text-blue-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{template.name}</span>
                    </div>
                    <p className="text-xs text-gray-600 truncate">{template.subject}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <input
                  type="email"
                  value={customer?.email || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={emailData.subject}
                  onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                  placeholder="Enter email subject"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={emailData.message}
                  onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                  placeholder="Enter your message"
                  rows="8"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>
              <button
                onClick={handleSendEmail}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 mr-2" />
                {isLoading ? 'Sending...' : 'Send Email'}
              </button>
            </div>
          </div>
        )}

        {/* SMS Tab */}
        {activeTab === 'sms' && (
          <div className="space-y-6">
            {/* Templates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                SMS Templates
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {smsTemplates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleSmsTemplateSelect(template)}
                    className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center mb-2">
                      <MessageSquare className="w-4 h-4 text-green-500 mr-2" />
                      <span className="text-sm font-medium text-gray-900">{template.name}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2">{template.message}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* SMS Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  To
                </label>
                <input
                  type="tel"
                  value={customer?.phone || ''}
                  disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={smsData.message}
                  onChange={(e) => setSmsData({ ...smsData, message: e.target.value })}
                  placeholder="Enter your SMS message"
                  rows="4"
                  maxLength="160"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {smsData.message.length}/160 characters
                </p>
              </div>
              <button
                onClick={handleSendSms}
                disabled={isLoading}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4 mr-2" />
                {isLoading ? 'Sending...' : 'Send SMS'}
              </button>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div>
            <p className="text-gray-600 text-center py-8">
              Communication history will be displayed here.
              <br />
              This feature will show all past emails and SMS sent to this customer.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerCommunication;
