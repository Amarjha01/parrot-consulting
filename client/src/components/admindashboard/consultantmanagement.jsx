// import ConsultantCard from "./consultantCard";
// import { Users } from 'lucide-react';



// export const ConsultantsManagement = ({ consultants, onApprove, onReject, loading, onRefresh }) => {
//     return (
//       <div className="space-y-6">
//         <div className="flex items-center justify-between">
//           <h2 className="text-xl font-semibold text-gray-900">
//             Pending Consultant Applications ({consultants.length})
//           </h2>
//           <button
//             onClick={onRefresh}
//             className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Refresh
//           </button>
//         </div>
        
//         {consultants.length === 0 ? (
//           <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
//             <Users size={48} className="mx-auto text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Applications</h3>
//             <p className="text-gray-600">All consultant applications have been processed.</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {consultants.map(consultant => (
//               <ConsultantCard
//                 key={consultant._id}
//                 consultant={consultant}
//                 onApprove={onApprove}
//                 onReject={onReject}
//                 loading={loading}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };


import ConsultantCard from "./consultantCard";
import { Users, RefreshCw, Clock, Search, Filter } from 'lucide-react';

export const ConsultantsManagement = ({ consultants, onApprove, onReject, loading, onRefresh }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-800 to-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100/50 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Title and Stats */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl flex items-center justify-center border border-green-200 shadow-lg">
                <Users className="w-8 h-8 text-green-700" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent">
                  Consultant Applications
                </h1>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-green-700 font-semibold">
                      {consultants.length} Pending Review
                    </span>
                  </div>
                  <div className="text-green-600 text-sm">
                    Last updated: 2 min ago
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-green-200 text-green-700 rounded-xl hover:bg-green-50 transition-all duration-200 hover:scale-105 shadow-sm">
                <Search className="w-4 h-4" />
                <span className="font-medium">Search</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-yellow-200 text-yellow-700 rounded-xl hover:bg-yellow-50 transition-all duration-200 hover:scale-105 shadow-sm">
                <Filter className="w-4 h-4" />
                <span className="font-medium">Filter</span>
              </button>
              
              <button
                onClick={onRefresh}
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-semibold"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span>{loading ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Section */}
        {consultants.length === 0 ? (
          <EmptyState />
        ) : (
          <ConsultantsList 
            consultants={consultants}
            onApprove={onApprove}
            onReject={onReject}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

// Enhanced Empty State Component
const EmptyState = () => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-green-100/50 p-16 text-center">
      <div className="max-w-md mx-auto">
        
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-yellow-100 rounded-full flex items-center justify-center mx-auto border border-green-200 shadow-lg">
            <Users size={48} className="text-green-600" />
          </div>
          
          {/* Floating elements */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-bounce shadow-lg"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
        </div>
        
        <h3 className="text-2xl font-bold text-green-800 mb-4">
          All Caught Up! 🎉
        </h3>
        <p className="text-green-600 text-lg mb-6 leading-relaxed">
          Great work! All consultant applications have been processed. 
          New applications will appear here when submitted.
        </p>
        
        {/* Action suggestions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-6 py-3 bg-gradient-to-r from-green-100 to-yellow-100 text-green-700 font-semibold rounded-xl hover:from-green-200 hover:to-yellow-200 transition-all duration-200 border border-green-200 hover:shadow-md">
            View Reports
          </button>
          <button className="px-6 py-3 bg-white text-green-700 font-semibold rounded-xl hover:bg-green-50 transition-all duration-200 border border-green-200 hover:shadow-md">
            Settings
          </button>
        </div>
      </div>
    </div>
  );
};

// Enhanced Consultants List Component
const ConsultantsList = ({ consultants, onApprove, onReject, loading }) => {
  return (
    <div className="space-y-6">
      
      {/* List Header */}
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl border border-green-100/50 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-semibold">
              Applications awaiting your review
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <span>Sort by:</span>
            <select className="bg-white border border-green-200 rounded-lg px-3 py-1 text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Newest First</option>
              <option>Oldest First</option>
              <option>Name A-Z</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Consultants Grid */}
      <div className="grid gap-6">
        {consultants.map((consultant, index) => (
          <div
            key={consultant._id}
            className="transform transition-all duration-300 hover:scale-[1.01]"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            <ConsultantCard
              consultant={consultant}
              onApprove={onApprove}
              onReject={onReject}
              loading={loading}
            />
          </div>
        ))}
      </div>
      
      {/* Footer Info */}
      <div className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl border border-green-100 p-6 text-center">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center sm:space-x-8 space-y-2 sm:space-y-0 text-sm text-green-700">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Quick actions available</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span>Auto-save enabled</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Real-time updates</span>
          </div>
        </div>
      </div>
    </div>
  );
};



export default ConsultantsManagement;