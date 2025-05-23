import React, { useState, useEffect } from 'react';
import { User, Users, CheckCircle, XCircle, LogOut, Shield, Bell, Settings } from 'lucide-react';

// Import your actual API functions
import { getallunapprovedconsultants, adminapproveconsultant, adminrejectconsultant, logout } from '../service/adminApi';
import DashboardOverview from '../components/admindashboard/dashoverview';


// Sidebar Component

const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'consultants', label: 'Pending Consultants', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-blue-400">Admin Panel</h2>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-900 hover:text-red-300 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ title }) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">Admin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

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

// Consultant Card Component
const ConsultantCard = ({ consultant, onApprove, onReject, loading }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="group relative">
      {/* Animated background with warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-orange-50 to-yellow-50 rounded-3xl transform transition-all duration-500 group-hover:scale-105 opacity-0 group-hover:opacity-100"></div>
      
      {/* Main card with warm theme */}
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-orange-100/50 p-8 space-y-6 transition-all duration-500 hover:shadow-2xl hover:border-orange-200/60">
        
        {/* Header section with warm gradient overlay */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 rounded-2xl -m-2"></div>
          <div className="relative flex items-start justify-between">
            <div className="flex-1 space-y-4">
              {/* Name with warm gradient text */}
              <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-700 via-amber-700 to-yellow-700 bg-clip-text text-transparent">
                {consultant.name}
              </h3>
              
              {/* Contact info with warm accent colors */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full animate-pulse"></div>
                  <p className="text-gray-700 font-medium">{consultant.email}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full animate-pulse"></div>
                  <p className="text-gray-600">📞 {consultant.phoneNumber}</p>
                </div>
              </div>
              
              {/* Experience badge with warm colors */}
              <div className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full border border-orange-200">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-orange-800 font-semibold text-sm">
                  {consultant.experience} years of expertise
                </span>
              </div>
              
              {/* Application date with warm styling */}
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center">
                  📅
                </div>
                <span>Applied: {new Date(consultant.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Action buttons with warm theme */}
            <div className="flex flex-col space-y-3 ml-6">
              <button
                onClick={() => onApprove(consultant._id)}
                disabled={loading}
                className="group/btn relative px-6 py-3 text-sm font-semibold rounded-2xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:hover:translate-y-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center space-x-2">
                  <span>🟢</span>
                  <span>Approve</span>
                </span>
              </button>
              
              <button
                onClick={() => onReject(consultant._id)}
                disabled={loading}
                className="group/btn relative px-6 py-3 text-sm font-semibold rounded-2xl text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:hover:translate-y-0"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-500 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center space-x-2">
                  <span>🔴</span>
                  <span>Reject</span>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Toggle details button with warm styling */}
        <div className="flex justify-center">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="group/toggle relative px-8 py-3 text-sm font-medium bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 hover:from-orange-200 hover:to-amber-200 rounded-full transition-all duration-300 border border-orange-200 hover:border-orange-300"
          >
            <span className="flex items-center space-x-2">
              <span>{showDetails ? "Hide Details" : "View More Details"}</span>
              <div className={`transform transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`}>
                🔽
              </div>
            </span>
          </button>
        </div>

        {/* Expandable details section */}
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showDetails ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-6 border-t border-gradient-to-r from-transparent via-orange-200 to-transparent">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Basic Info Section */}
              <div className="space-y-4">
                <SectionHeader title="Basic Information" emoji="🏠" />
                
                <div className="space-y-3">
                  <WarmDetailItem label="Address" value={consultant.address} emoji="🏠" />
                  <WarmDetailItem 
                    label="Resume" 
                    value={<a href={consultant.resume} target="_blank" className="text-orange-600 hover:text-orange-800 underline font-medium transition-colors">View Resume →</a>} 
                    emoji="📄" 
                  />
                  <WarmDetailItem label="Primary Category" value={consultant.primaryCategory} emoji="🎯" />
                  <WarmDetailItem label="Hourly Rate" value={`₹${consultant.hourlyRate}`} emoji="💰" />
                </div>
              </div>

              {/* Professional Info Section */}
              <div className="space-y-4">
                <SectionHeader title="Professional Details" emoji="⚡" />
                
                <div className="space-y-3">
                  <WarmDetailItem label="Specialized Services" value={consultant.specializedServices?.join(', ')} emoji="🛠️" />
                  <WarmDetailItem label="Key Skills" value={consultant.keySkills?.join(', ')} emoji="💡" />
                  <WarmDetailItem label="Languages" value={consultant.languageProficiency?.join(', ')} emoji="🌐" />
                  <WarmDetailItem label="Availability/Week" value={consultant.availabilityPerWeek} emoji="📅" />
                  <WarmDetailItem label="Preferred Hours" value={consultant.preferredWorkingHours} emoji="⏰" />
                  <WarmDetailItem label="Lead Time" value={consultant.bookingLeadTime} emoji="⏱️" />
                </div>
              </div>

              {/* Status Section */}
              <div className="space-y-4">
                <SectionHeader title="Status & Settings" emoji="⚙️" />
                
                <div className="space-y-3">
                  <WarmStatusItem label="Accepted Terms" status={consultant.acceptedTerms} />
                  <WarmStatusItem label="Visible on Platform" status={consultant.visibleOnPlatform} />
                </div>
              </div>

              {/* Documents Section */}
              <div className="space-y-4">
                <SectionHeader title="Documents & Verification" emoji="📋" />
                
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100">
                    <p className="font-medium text-orange-800 mb-3 flex items-center">
                      <span className="mr-2">🆔</span>
                      Identity Documents
                    </p>
                    <div className="space-y-2 ml-6">
                      <WarmDocumentLink href={consultant.documents?.aadhaarCard} label="Aadhaar Card" />
                      {consultant.documents?.panCard && <WarmDocumentLink href={consultant.documents.panCard} label="PAN Card" />}
                      {consultant.documents?.passport && <WarmDocumentLink href={consultant.documents.passport} label="Passport" />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Certificates Section */}
              {consultant.certificates?.length > 0 && (
                <div className="lg:col-span-2 space-y-4">
                  <SectionHeader title="Certificates & Achievements" emoji="🏆" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {consultant.certificates.map((cert, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200 hover:border-orange-300 transition-colors">
                        <a href={cert.fileUrl} target="_blank" className="text-orange-700 hover:text-orange-900 font-medium transition-colors flex items-center space-x-2">
                          <span>🏅</span>
                          <span>{cert.name}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education Section */}
              {consultant.education?.length > 0 && (
                <div className="lg:col-span-2 space-y-4">
                  <SectionHeader title="Educational Background" emoji="🎓" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {consultant.education.map((edu, idx) => (
                      <div key={idx} className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-5 border border-amber-200 hover:border-orange-300 transition-colors">
                        <div className="space-y-2">
                          <p className="font-bold text-orange-800 flex items-center">
                            <span className="mr-2">🎓</span>
                            {edu.qualification}
                          </p>
                          <p className="text-orange-700 font-medium">{edu.fieldOfStudy}</p>
                          <p className="text-orange-600">{edu.university}</p>
                          <div className="inline-flex items-center px-3 py-1 bg-orange-100 rounded-full">
                            <span className="text-orange-700 text-sm font-medium">Class of {edu.graduationYear}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components with warm theme
const SectionHeader = ({ title, emoji }) => (
  <div className="flex items-center space-x-3 pb-2 border-b-2 border-gradient-to-r from-orange-200 to-amber-200">
    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-amber-100 rounded-full flex items-center justify-center text-lg border border-black">
      {emoji}
    </div>
    <h4 className="text-lg font-bold text-green-800">{title}</h4>
  </div>
);

const WarmDetailItem = ({ label, value, emoji }) => (
  <div className="flex items-start space-x-3 p-4 rounded-2xl bg-gradient-to-r from-green-200 to-amber-50 border border-black hover:border-orange-200 hover:shadow-sm transition-all duration-200">
    <div className="w-8 h-8 bg-gradient-to-br from-black to-gray-100 rounded-full flex items-center justify-center text-sm border border-orange-200">
      {emoji}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-black text-sm">{label}</p>
      <div className="text-green-700 text-sm mt-1 break-words">{value || 'Not specified'}</div>
    </div>
  </div>
);

const WarmStatusItem = ({ label, status }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-green-200 to-amber-50 border border-black">
    <span className="font-semibold text-green-800 text-sm">{label}</span>
    <div className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold border-2 ${
      status 
        ? 'bg-green-100 text-green-800 border-black' 
        : 'bg-red-100 text-red-800 border-red-300'
    }`}>
      <div className={`w-2 h-2 rounded-full mr-2 ${status ? 'bg-green-500' : 'bg-red-500'}`}></div>
      {status ? 'Yes' : 'No'}
    </div>
  </div>
);

const WarmDocumentLink = ({ href, label }) => (
  <div className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-black hover:border-orange-300 hover:shadow-sm transition-all">
    <div className="w-6 h-6 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center text-xs">
      📎
    </div>
    <a href={href} target="_blank" className="text-black hover:text-orange-900 text-sm font-medium transition-colors">
      {label}
    </a>
  </div>
);


// Dashboard Overview Component
// const DashboardOverview = ({ consultants }) => {
//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatsCard
//           title="Pending Applications"
//           value={consultants.length}
//           icon={Users}
//           color="yellow"
//         />
//         <StatsCard
//           title="Total Processed Today"
//           value="12"
//           icon={CheckCircle}
//           color="green"
//         />
//         <StatsCard
//           title="Approved This Week"
//           value="45"
//           icon={CheckCircle}
//           color="blue"
//         />
//         <StatsCard
//           title="Rejected This Week"
//           value="8"
//           icon={XCircle}
//           color="red"
//         />
//       </div>
      
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
//         <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
//         <div className="space-y-3">
//           <div className="flex items-center space-x-3 text-sm">
//             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//             <span className="text-gray-600">Approved consultant: John Smith</span>
//             <span className="text-gray-400">2 hours ago</span>
//           </div>
//           <div className="flex items-center space-x-3 text-sm">
//             <div className="w-2 h-2 bg-red-500 rounded-full"></div>
//             <span className="text-gray-600">Rejected consultant: Alice Johnson</span>
//             <span className="text-gray-400">4 hours ago</span>
//           </div>
//           <div className="flex items-center space-x-3 text-sm">
//             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//             <span className="text-gray-600">New application from: Mike Davis</span>
//             <span className="text-gray-400">6 hours ago</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
<DashboardOverview />
// Consultants Management Component
const ConsultantsManagement = ({ consultants, onApprove, onReject, loading, onRefresh }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Pending Consultant Applications ({consultants.length})
        </h2>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh
        </button>
      </div>
      
      {consultants.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Users size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Applications</h3>
          <p className="text-gray-600">All consultant applications have been processed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {consultants.map(consultant => (
            <ConsultantCard
              key={consultant._id}
              consultant={consultant}
              onApprove={onApprove}
              onReject={onReject}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Settings Component
const SettingsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auto-approval threshold (years of experience)
            </label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue="10"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email notifications
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">New applications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700">Weekly summary</span>
              </label>
            </div>
          </div>
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
      // window.location.href = '/admin/login';
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
    <div className="flex h-screen bg-gray-50">
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