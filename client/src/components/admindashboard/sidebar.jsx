import { User, Users, CheckCircle, XCircle, LogOut, Shield, Bell, Settings, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when tab changes
  useEffect(() => {
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  }, [activeTab, isMobile]);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'consultants', label: 'Pending Consultants', icon: Users },
    { id: 'bookings', label: 'Bookings', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const SidebarContent = () => (
    <>
      {/* Sidebar Header */}
      <div className={`mb-8 p-6 border-b border-green-600/30 ${isMobile ? 'pt-4' : ''}`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
            <Shield size={24} className="text-green-800" />
          </div>
          <div className="lg:block">
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-green-200 text-sm opacity-90 hidden sm:block">Management Console</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full group relative flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ease-in-out transform hover:scale-[1.02] ${
                isActive
                  ? 'bg-yellow-500 text-green-900 shadow-lg font-semibold'
                  : 'text-green-100 hover:bg-green-600/50 hover:text-white hover:shadow-md'
              }`}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-green-800 rounded-r-full"></div>
              )}
              
              <div className={`p-1.5 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-green-800/20' 
                  : 'group-hover:bg-green-500/20'
              }`}>
                <Icon size={18} className={isActive ? 'text-green-800' : 'text-green-200'} />
              </div>
              
              <span className={`font-medium transition-colors ${
                isActive ? 'text-green-900' : 'text-green-100'
              } truncate`}>
                {item.label}
              </span>

              {/* Hover indicator */}
              {!isActive && (
                <div className="absolute right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer with Logout */}
      <div className="p-4 border-t border-green-600/30 mt-auto">
        <button
          onClick={onLogout}
          className="w-full group flex items-center space-x-3 px-4 py-3 rounded-xl text-yellow-400 font-semibold hover:bg-red-500 hover:text-white transition-all duration-200 ease-in-out transform hover:scale-[1.02] hover:shadow-lg"
        >
          <div className="p-1.5 rounded-lg group-hover:bg-red-600/20 transition-colors">
            <LogOut size={18} />
          </div>
          <span className="truncate">Logout</span>
          
          {/* Logout arrow indicator */}
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-2 h-2 border-t-2 border-r-2 border-white transform rotate-45"></div>
          </div>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-green-700 text-white rounded-lg shadow-lg hover:bg-green-600 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex bg-gradient-to-b from-green-700 to-green-800 text-white w-64 min-h-screen flex-col shadow-xl">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      <aside 
        className={`lg:hidden fixed left-0 top-0 z-40 bg-gradient-to-b from-green-700 to-green-800 text-white min-h-screen flex flex-col shadow-xl transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'w-80 sm:w-64 translate-x-0' 
            : 'w-80 sm:w-64 -translate-x-full'
        }`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center p-4 border-b border-green-600/30">
          <div className="flex items-center space-x-2">
            <Shield size={20} className="text-yellow-400" />
            <span className="text-lg font-semibold">Menu</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-1 hover:bg-green-600/50 rounded transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 flex flex-col">
          <SidebarContent />
        </div>
      </aside>

      {/* Spacer for mobile to prevent content overlap */}
      <div className="lg:hidden h-16"></div>
    </>
  );
};