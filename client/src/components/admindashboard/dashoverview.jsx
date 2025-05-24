// import { Users, CheckCircle, XCircle, Clock, TrendingUp, Activity } from 'lucide-react';

// const DashboardOverview = ({ consultants }) => {
//   return (
//     <div className="space-y-8">
//       {/* Stats Cards Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <WarmStatsCard
//           title="Pending Applications"
//           value={consultants.length}
//           icon={Users}
//           color="orange"
//           trend="+12%"
//           description="New applications"
//         />
//         <WarmStatsCard
//           title="Processed Today"
//           value="12"
//           icon={CheckCircle}
//           color="green"
//           trend="+8%"
//           description="Completed reviews"
//         />
//         <WarmStatsCard
//           title="Approved This Week"
//           value="45"
//           icon={TrendingUp}
//           color="blue"
//           trend="+15%"
//           description="Success rate: 85%"
//         />
//         <WarmStatsCard
//           title="Rejected This Week"
//           value="8"
//           icon={XCircle}
//           color="red"
//           trend="-5%"
//           description="Quality maintained"
//         />
//       </div>
      
//       {/* Recent Activity Section */}
//       <div className="bg-gradient-to-br from-white via-orange-50/30 to-amber-50/30 rounded-3xl shadow-xl border border-orange-100/50 p-8 backdrop-blur-sm">
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center border border-orange-200">
//               <Activity className="w-6 h-6 text-orange-600" />
//             </div>
//             <div>
//               <h3 className="text-xl font-bold bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent">
//                 Recent Activity
//               </h3>
//               <p className="text-orange-600 text-sm">Latest consultant reviews</p>
//             </div>
//           </div>
//           <div className="text-right">
//             <p className="text-sm text-orange-600">Last updated</p>
//             <p className="text-xs text-orange-500">2 minutes ago</p>
//           </div>
//         </div>
        
//         <div className="space-y-4">
//           <ActivityItem
//             type="approved"
//             action="Approved consultant"
//             name="John Smith"
//             time="2 hours ago"
//             details="Software Development Expert"
//           />
//           <ActivityItem
//             type="rejected"
//             action="Rejected consultant"
//             name="Alice Johnson"
//             time="4 hours ago"
//             details="Insufficient experience"
//           />
//           <ActivityItem
//             type="new"
//             action="New application from"
//             name="Mike Davis"
//             time="6 hours ago"
//             details="Marketing Specialist"
//           />
//           <ActivityItem
//             type="approved"
//             action="Approved consultant"
//             name="Sarah Wilson"
//             time="8 hours ago"
//             details="Financial Advisor"
//           />
//           <ActivityItem
//             type="new"
//             action="New application from"
//             name="Robert Chen"
//             time="1 day ago"
//             details="Data Analytics Expert"
//           />
//         </div>
        
//         {/* View More Button */}
//         <div className="mt-6 text-center">
//           <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-100 to-amber-100 hover:from-orange-200 hover:to-amber-200 text-orange-700 font-medium rounded-full transition-all duration-300 border border-orange-200 hover:border-orange-300 hover:shadow-md">
//             <span>View All Activity</span>
//             <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>
//         </div>
//       </div>
      
//       {/* Quick Actions Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <QuickActionCard
//           title="Review Pending"
//           description="You have consultants waiting for review"
//           count={consultants.length}
//           action="Review Now"
//           icon="👥"
//           gradient="from-orange-100 to-amber-100"
//           textColor="text-orange-700"
//           borderColor="border-orange-200"
//         />
//         <QuickActionCard
//           title="Generate Report"
//           description="Weekly consultant approval summary"
//           count="Ready"
//           action="Generate"
//           icon="📊"
//           gradient="from-yellow-100 to-orange-100"
//           textColor="text-yellow-700"
//           borderColor="border-yellow-200"
//         />
//       </div>
//     </div>
//   );
// };

// // Warm-themed Stats Card Component
// const WarmStatsCard = ({ title, value, icon: Icon, color, trend, description }) => {
//   const colorClasses = {
//     orange: {
//       bg: 'from-orange-50 to-amber-50',
//       border: 'border-orange-200',
//       iconBg: 'from-orange-100 to-amber-100',
//       iconColor: 'text-orange-600',
//       textColor: 'text-orange-800',
//       valueColor: 'text-orange-900'
//     },
//     green: {
//       bg: 'from-green-50 to-emerald-50',
//       border: 'border-green-200',
//       iconBg: 'from-green-100 to-emerald-100',
//       iconColor: 'text-green-600',
//       textColor: 'text-green-800',
//       valueColor: 'text-green-900'
//     },
//     blue: {
//       bg: 'from-blue-50 to-cyan-50',
//       border: 'border-blue-200',
//       iconBg: 'from-blue-100 to-cyan-100',
//       iconColor: 'text-blue-600',
//       textColor: 'text-blue-800',
//       valueColor: 'text-blue-900'
//     },
//     red: {
//       bg: 'from-red-50 to-rose-50',
//       border: 'border-red-200',
//       iconBg: 'from-red-100 to-rose-100',
//       iconColor: 'text-red-600',
//       textColor: 'text-red-800',
//       valueColor: 'text-red-900'
//     }
//   };

//   const colors = colorClasses[color];

//   return (
//     <div className={`group relative bg-gradient-to-br ${colors.bg} rounded-2xl p-6 border ${colors.border} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
//       <div className="flex items-start justify-between">
//         <div className="flex-1">
//           <div className={`w-12 h-12 bg-gradient-to-br ${colors.iconBg} rounded-xl flex items-center justify-center mb-4 border ${colors.border} group-hover:scale-110 transition-transform duration-300`}>
//             <Icon className={`w-6 h-6 ${colors.iconColor}`} />
//           </div>
          
//           <h3 className={`text-sm font-medium ${colors.textColor} mb-1`}>{title}</h3>
//           <p className={`text-3xl font-bold ${colors.valueColor} mb-2`}>{value}</p>
          
//           <div className="flex items-center justify-between">
//             <span className={`text-xs ${colors.textColor}`}>{description}</span>
//             {trend && (
//               <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
//                 trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
//               }`}>
//                 {trend}
//               </span>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Activity Item Component
// const ActivityItem = ({ type, action, name, time, details }) => {
//   const typeStyles = {
//     approved: {
//       color: 'bg-green-500',
//       emoji: '✅',
//       bgColor: 'from-green-50 to-emerald-50',
//       borderColor: 'border-green-200'
//     },
//     rejected: {
//       color: 'bg-red-500',
//       emoji: '❌',
//       bgColor: 'from-red-50 to-rose-50',
//       borderColor: 'border-red-200'
//     },
//     new: {
//       color: 'bg-blue-500',
//       emoji: '📝',
//       bgColor: 'from-blue-50 to-cyan-50',
//       borderColor: 'border-blue-200'
//     }
//   };

//   const style = typeStyles[type];

//   return (
//     <div className={`flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r ${style.bgColor} border ${style.borderColor} hover:shadow-sm transition-all duration-200`}>
//       <div className="flex-shrink-0">
//         <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
//           <span className="text-lg">{style.emoji}</span>
//         </div>
//       </div>
      
//       <div className="flex-1 min-w-0">
//         <div className="flex items-center space-x-2">
//           <span className="text-sm font-medium text-gray-700">{action}:</span>
//           <span className="text-sm font-semibold text-gray-900">{name}</span>
//         </div>
//         <p className="text-xs text-gray-600 mt-1">{details}</p>
//       </div>
      
//       <div className="flex-shrink-0">
//         <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full border border-gray-200">
//           {time}
//         </span>
//       </div>
//     </div>
//   );
// };

// // Quick Action Card Component
// const QuickActionCard = ({ title, description, count, action, icon, gradient, textColor, borderColor }) => {
//   return (
//     <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 border ${borderColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
//       <div className="flex items-center justify-between mb-4">
//         <div className="text-2xl">{icon}</div>
//         <div className={`text-2xl font-bold ${textColor}`}>{count}</div>
//       </div>
      
//       <h4 className={`text-lg font-semibold ${textColor} mb-2`}>{title}</h4>
//       <p className={`text-sm ${textColor} opacity-80 mb-4`}>{description}</p>
      
//       <button className={`w-full py-2 px-4 bg-white ${textColor} font-medium rounded-xl hover:shadow-md transition-all duration-200 border border-white/50 hover:border-white/80`}>
//         {action}
//       </button>
//     </div>
//   );
// };

// export default DashboardOverview;

import { Users, CheckCircle, XCircle, Clock, TrendingUp, Activity } from 'lucide-react';

const DashboardOverview = ({ consultants }) => {
  return (
    <div className="space-y-8">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <WarmStatsCard
          title="Pending Applications"
          value={consultants.length}
          icon={Users}
          color="yellow"
          trend="+12%"
          description="New applications"
        />
        <WarmStatsCard
          title="Processed Today"
          value="12"
          icon={CheckCircle}
          color="green"
          trend="+8%"
          description="Completed reviews"
        />
        <WarmStatsCard
          title="Approved This Week"
          value="45"
          icon={TrendingUp}
          color="emerald"
          trend="+15%"
          description="Success rate: 85%"
        />
        <WarmStatsCard
          title="Rejected This Week"
          value="8"
          icon={XCircle}
          color="red"
          trend="-5%"
          description="Quality maintained"
        />
      </div>
      
      {/* Recent Activity Section */}
      <div className="bg-gradient-to-br from-white via-green-50/30 to-yellow-50/30 rounded-3xl shadow-xl border border-green-200/50 p-8 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl flex items-center justify-center border border-green-200 shadow-sm">
              <Activity className="w-6 h-6 text-green-700" />
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-green-700 to-green-800 bg-clip-text text-transparent">
                Recent Activity
              </h3>
              <p className="text-green-600 text-sm">Latest consultant reviews</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-600">Last updated</p>
            <p className="text-xs text-green-500">2 minutes ago</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <ActivityItem
            type="approved"
            action="Approved consultant"
            name="John Smith"
            time="2 hours ago"
            details="Software Development Expert"
          />
          <ActivityItem
            type="rejected"
            action="Rejected consultant"
            name="Alice Johnson"
            time="4 hours ago"
            details="Insufficient experience"
          />
          <ActivityItem
            type="new"
            action="New application from"
            name="Mike Davis"
            time="6 hours ago"
            details="Marketing Specialist"
          />
          <ActivityItem
            type="approved"
            action="Approved consultant"
            name="Sarah Wilson"
            time="8 hours ago"
            details="Financial Advisor"
          />
          <ActivityItem
            type="new"
            action="New application from"
            name="Robert Chen"
            time="1 day ago"
            details="Data Analytics Expert"
          />
        </div>
        
        {/* View More Button */}
        <div className="mt-6 text-center">
          <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-yellow-100 hover:from-green-200 hover:to-yellow-200 text-green-700 font-medium rounded-full transition-all duration-300 border border-green-200 hover:border-green-300 hover:shadow-md">
            <span>View All Activity</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <QuickActionCard
          title="Review Pending"
          description="You have consultants waiting for review"
          count={consultants.length}
          action="Review Now"
          icon="👥"
          gradient="from-green-100 to-yellow-100"
          textColor="text-green-700"
          borderColor="border-green-200"
        />
        <QuickActionCard
          title="Generate Report"
          description="Weekly consultant approval summary"
          count="Ready"
          action="Generate"
          icon="📊"
          gradient="from-yellow-100 to-green-100"
          textColor="text-green-700"
          borderColor="border-yellow-200"
        />
      </div>
    </div>
  );
};

// Enhanced Stats Card Component with Green/Yellow Theme
const WarmStatsCard = ({ title, value, icon: Icon, color, trend, description }) => {
  const colorClasses = {
    yellow: {
      bg: 'from-yellow-50 to-yellow-100',
      border: 'border-yellow-200',
      iconBg: 'from-yellow-100 to-yellow-200',
      iconColor: 'text-yellow-700',
      textColor: 'text-yellow-800',
      valueColor: 'text-yellow-900',
      shadowColor: 'hover:shadow-yellow-100'
    },
    green: {
      bg: 'from-green-50 to-green-100',
      border: 'border-green-200',
      iconBg: 'from-green-100 to-green-200',
      iconColor: 'text-green-700',
      textColor: 'text-green-800',
      valueColor: 'text-green-900',
      shadowColor: 'hover:shadow-green-100'
    },
    emerald: {
      bg: 'from-emerald-50 to-emerald-100',
      border: 'border-emerald-200',
      iconBg: 'from-emerald-100 to-emerald-200',
      iconColor: 'text-emerald-700',
      textColor: 'text-emerald-800',
      valueColor: 'text-emerald-900',
      shadowColor: 'hover:shadow-emerald-100'
    },
    red: {
      bg: 'from-red-50 to-red-100',
      border: 'border-red-200',
      iconBg: 'from-red-100 to-red-200',
      iconColor: 'text-red-700',
      textColor: 'text-red-800',
      valueColor: 'text-red-900',
      shadowColor: 'hover:shadow-red-100'
    }
  };

  const colors = colorClasses[color];

  return (
    <div className={`group relative bg-gradient-to-br ${colors.bg} rounded-2xl p-6 border ${colors.border} hover:shadow-xl ${colors.shadowColor} transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className={`w-12 h-12 bg-gradient-to-br ${colors.iconBg} rounded-xl flex items-center justify-center mb-4 border ${colors.border} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
            <Icon className={`w-6 h-6 ${colors.iconColor}`} />
          </div>
          
          <h3 className={`text-sm font-semibold ${colors.textColor} mb-1`}>{title}</h3>
          <p className={`text-3xl font-bold ${colors.valueColor} mb-2`}>{value}</p>
          
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${colors.textColor}`}>{description}</span>
            {trend && (
              <span className={`text-xs font-semibold px-2 py-1 rounded-full shadow-sm ${
                trend.startsWith('+') ? 'bg-green-200 text-green-800 border border-green-300' : 'bg-red-200 text-red-800 border border-red-300'
              }`}>
                {trend}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Activity Item Component
const ActivityItem = ({ type, action, name, time, details }) => {
  const typeStyles = {
    approved: {
      color: 'bg-green-500',
      emoji: '✅',
      bgColor: 'from-green-50 to-green-100',
      borderColor: 'border-green-200',
      textColor: 'text-green-800'
    },
    rejected: {
      color: 'bg-red-500',
      emoji: '❌',
      bgColor: 'from-red-50 to-red-100',
      borderColor: 'border-red-200',
      textColor: 'text-red-800'
    },
    new: {
      color: 'bg-yellow-500',
      emoji: '📝',
      bgColor: 'from-yellow-50 to-yellow-100',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800'
    }
  };

  const style = typeStyles[type];

  return (
    <div className={`flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r ${style.bgColor} border ${style.borderColor} hover:shadow-md transition-all duration-200 hover:scale-[1.01]`}>
      <div className="flex-shrink-0">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
          <span className="text-lg">{style.emoji}</span>
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${style.textColor}`}>{action}:</span>
          <span className={`text-sm font-bold ${style.textColor}`}>{name}</span>
        </div>
        <p className={`text-xs ${style.textColor} opacity-75 mt-1`}>{details}</p>
      </div>
      
      <div className="flex-shrink-0">
        <span className="text-xs text-gray-600 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm font-medium">
          {time}
        </span>
      </div>
    </div>
  );
};

// Enhanced Quick Action Card Component
const QuickActionCard = ({ title, description, count, action, icon, gradient, textColor, borderColor }) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-6 border ${borderColor} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <div className="text-3xl filter drop-shadow-sm">{icon}</div>
        <div className={`text-2xl font-bold ${textColor} bg-white px-3 py-1 rounded-xl shadow-sm border border-white/50`}>{count}</div>
      </div>
      
      <h4 className={`text-lg font-bold ${textColor} mb-2`}>{title}</h4>
      <p className={`text-sm ${textColor} opacity-80 mb-4 font-medium`}>{description}</p>
      
      <button className={`w-full py-3 px-4 bg-white ${textColor} font-semibold rounded-xl hover:shadow-lg transition-all duration-200 border border-white/50 hover:border-white/80 hover:scale-[1.02]`}>
        {action}
      </button>
    </div>
  );
};

export default DashboardOverview;