import React, { useState, useEffect } from 'react';

import { getallunapprovedconsultants, adminapproveconsultant, adminrejectconsultant, logout } from '../service/adminApi';
import DashboardOverview from '../components/admindashboard/dashoverview';
import { Sidebar } from '../components/admindashboard/sidebar';
import { Header } from '../components/admindashboard/header';
import { ConsultantsManagement } from '../components/admindashboard/consultantmanagement';
import { SettingsPanel } from '../components/admindashboard/settingPannel';



// Stats Card Component
const StatsCard = ({ title, value, icon: Icon, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
    red: "bg-red-50 text-red-600 border-red-200"
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
};


// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchConsultants = async () => {
    try {
      setLoading(true);
      const response = await getallunapprovedconsultants();
      setConsultants(response.data || response);
    } catch (error) {
      console.error('Error fetching consultants:', error);
      showNotification('Failed to fetch consultants', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (consultantId) => {
    try {
      setLoading(true);
      const response = await adminapproveconsultant(consultantId);
      setConsultants(prev => prev.filter(c => c._id !== consultantId));
      showNotification(response.message || 'Consultant approved successfully');
    } catch (error) {
      console.error('Error approving consultant:', error);
      showNotification(error.message || 'Failed to approve consultant', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (consultantId) => {
    try {
      setLoading(true);
      const response = await adminrejectconsultant(consultantId);
      setConsultants(prev => prev.filter(c => c._id !== consultantId));
      showNotification(response.message || 'Consultant rejected successfully');
    } catch (error) {
      console.error('Error rejecting consultant:', error);
      showNotification(error.message || 'Failed to reject consultant', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      showNotification(response.message || 'Logged out successfully');
      // Redirect to login page or clear auth state
      window.location.href = '/adminsecuredlogin';
    } catch (error) {
      console.error('Logout error:', error);
      showNotification(error.message || 'Logout failed', 'error');
    }
  };

  useEffect(() => {
    fetchConsultants();
  }, []);

  const getPageTitle = () => {
    switch (activeTab) {
      case 'consultants': return 'Consultant Management';
      case 'settings': return 'Settings';
      default: return 'Dashboard Overview';
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'consultants':
        return (
          <ConsultantsManagement
            consultants={consultants}
            onApprove={handleApprove}
            onReject={handleReject}
            loading={loading}
            onRefresh={fetchConsultants}
          />
        );
      case 'settings':
        return <SettingsPanel />;
      default:
        return <DashboardOverview consultants={consultants} />;
    }
  };

  return (
    <div className="flex h-screen bg-black">
      <Sidebar
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderActiveTab()}
        </main>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
          notification.type === 'error' 
            ? 'bg-red-500 text-white' 
            : 'bg-green-500 text-white'
        }`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;