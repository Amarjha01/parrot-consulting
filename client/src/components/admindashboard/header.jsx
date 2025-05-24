import { User, Users, CheckCircle, XCircle, LogOut, Shield, Bell, Settings } from 'lucide-react';


export const Header = ({ title }) => {
    return (
      <div className="bg-green-700 shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white ">{title}</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-yellow-400 hover:text-black transition-colors">
              <Bell size={20} />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <User size={16} className="text-black" />
              </div>
              <span className="text-sm font-medium text-yellow-400">Admin</span>
            </div>
          </div>
        </div>
      </div>
    );
  };