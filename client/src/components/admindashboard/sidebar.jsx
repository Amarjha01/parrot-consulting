import { User, Users, CheckCircle, XCircle, LogOut, Shield, Bell, Settings } from 'lucide-react';

export const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Shield },
    { id: 'consultants', label: 'Pending Consultants', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="bg-gradient-to-b from-green-700 to-green-800 text-white w-64 min-h-screen flex flex-col shadow-xl">
      {/*Sidebar Header */}
      <div className="mb-8 p-6 border-b border-green-600/30">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
            <Shield size={24} className="text-green-800" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-green-200 text-sm opacity-90">Management Console</p>
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
              }`}>
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
          <span>Logout</span>
          
          {/* Logout arrow indicator */}
          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-2 h-2 border-t-2 border-r-2 border-white transform rotate-45"></div>
          </div>
        </button>
      </div>
    </div>
  );
};