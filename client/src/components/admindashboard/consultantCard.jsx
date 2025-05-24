// import { useState } from 'react';

// const ConsultantCard = ({ consultant, onApprove, onReject, loading }) => {
//   const [showDetails, setShowDetails] = useState(false);

//   return (
//     <div className="group relative">
//       {/* Animated background with warm gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl transform transition-all duration-500 group-hover:scale-105 opacity-0 group-hover:opacity-100"></div>
      
//       {/* Main card with warm theme */}
//       <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl border border-orange-100/50 p-8 space-y-6 transition-all duration-500 hover:shadow-2xl hover:border-orange-200/60">
        
//         {/* Header section with warm gradient overlay */}
//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 rounded-2xl -m-2"></div>
//           <div className="relative flex items-start justify-between">
//             <div className="flex-1 space-y-4">
//               {/* Name with warm gradient text */}
//               <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-700 via-amber-700 to-yellow-700 bg-clip-text text-transparent">
//                 {consultant.name}
//               </h3>
              
//               {/* Contact info with warm accent colors */}
//               <div className="space-y-2">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full animate-pulse"></div>
//                   <p className="text-gray-700 font-medium">{consultant.email}</p>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full animate-pulse"></div>
//                   <p className="text-gray-600">📞 {consultant.phoneNumber}</p>
//                 </div>
//               </div>
              
//               {/* Experience badge with warm colors */}
//               <div className="inline-flex items-center px-5 py-3 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full border border-orange-200">
//                 <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 animate-pulse"></div>
//                 <span className="text-orange-800 font-semibold text-sm">
//                   {consultant.experience} years of expertise
//                 </span>
//               </div>
              
//               {/* Application date with warm styling */}
//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <div className="w-8 h-8 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center">
//                   📅
//                 </div>
//                 <span>Applied: {new Date(consultant.createdAt).toLocaleDateString()}</span>
//               </div>
//             </div>

//             {/* Action buttons with warm theme */}
//             <div className="flex flex-col space-y-3 ml-6">
//               <button
//                 onClick={() => onApprove(consultant._id)}
//                 disabled={loading}
//                 className="group/btn relative px-6 py-3 text-sm font-semibold rounded-2xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:hover:translate-y-0"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//                 <span className="relative flex items-center space-x-2">
//                   <span>🟢</span>
//                   <span>Approve</span>
//                 </span>
//               </button>
              
//               <button
//                 onClick={() => onReject(consultant._id)}
//                 disabled={loading}
//                 className="group/btn relative px-6 py-3 text-sm font-semibold rounded-2xl text-white bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:hover:translate-y-0"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-500 rounded-2xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
//                 <span className="relative flex items-center space-x-2">
//                   <span>🔴</span>
//                   <span>Reject</span>
//                 </span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Toggle details button with warm styling */}
//         <div className="flex justify-center">
//           <button
//             onClick={() => setShowDetails(!showDetails)}
//             className="group/toggle relative px-8 py-3 text-sm font-medium bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 hover:from-orange-200 hover:to-amber-200 rounded-full transition-all duration-300 border border-orange-200 hover:border-orange-300"
//           >
//             <span className="flex items-center space-x-2">
//               <span>{showDetails ? "Hide Details" : "View More Details"}</span>
//               <div className={`transform transition-transform duration-300 ${showDetails ? 'rotate-180' : ''}`}>
//                 🔽
//               </div>
//             </span>
//           </button>
//         </div>

//         {/* Expandable details section */}
//         <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
//           showDetails ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
//         }`}>
//           <div className="pt-6 border-t border-gradient-to-r from-transparent via-orange-200 to-transparent">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
//               {/* Basic Info Section */}
//               <div className="space-y-4">
//                 <SectionHeader title="Basic Information" emoji="🏠" />
                
//                 <div className="space-y-3">
//                   <WarmDetailItem label="Address" value={consultant.address} emoji="🏠" />
//                   <WarmDetailItem 
//                     label="Resume" 
//                     value={<a href={consultant.resume} target="_blank" className="text-orange-600 hover:text-orange-800 underline font-medium transition-colors">View Resume →</a>} 
//                     emoji="📄" 
//                   />
//                   <WarmDetailItem label="Primary Category" value={consultant.primaryCategory} emoji="🎯" />
//                   <WarmDetailItem label="Hourly Rate" value={`₹${consultant.hourlyRate}`} emoji="💰" />
//                 </div>
//               </div>

//               {/* Professional Info Section */}
//               <div className="space-y-4">
//                 <SectionHeader title="Professional Details" emoji="⚡" />
                
//                 <div className="space-y-3">
//                   <WarmDetailItem label="Specialized Services" value={consultant.specializedServices?.join(', ')} emoji="🛠️" />
//                   <WarmDetailItem label="Key Skills" value={consultant.keySkills?.join(', ')} emoji="💡" />
//                   <WarmDetailItem label="Languages" value={consultant.languageProficiency?.join(', ')} emoji="🌐" />
//                   <WarmDetailItem label="Availability/Week" value={consultant.availabilityPerWeek} emoji="📅" />
//                   <WarmDetailItem label="Preferred Hours" value={consultant.preferredWorkingHours} emoji="⏰" />
//                   <WarmDetailItem label="Lead Time" value={consultant.bookingLeadTime} emoji="⏱️" />
//                 </div>
//               </div>

//               {/* Status Section */}
//               <div className="space-y-4">
//                 <SectionHeader title="Status & Settings" emoji="⚙️" />
                
//                 <div className="space-y-3">
//                   <WarmStatusItem label="Accepted Terms" status={consultant.acceptedTerms} />
//                   <WarmStatusItem label="Visible on Platform" status={consultant.visibleOnPlatform} />
//                 </div>
//               </div>

//               {/* Documents Section */}
//               <div className="space-y-4">
//                 <SectionHeader title="Documents & Verification" emoji="📋" />
                
//                 <div className="space-y-3">
//                   <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100">
//                     <p className="font-medium text-orange-800 mb-3 flex items-center">
//                       <span className="mr-2">🆔</span>
//                       Identity Documents
//                     </p>
//                     <div className="space-y-2 ml-6">
//                       <WarmDocumentLink href={consultant.documents?.aadhaarCard} label="Aadhaar Card" />
//                       {consultant.documents?.panCard && <WarmDocumentLink href={consultant.documents.panCard} label="PAN Card" />}
//                       {consultant.documents?.passport && <WarmDocumentLink href={consultant.documents.passport} label="Passport" />}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Certificates Section */}
//               {consultant.certificates?.length > 0 && (
//                 <div className="lg:col-span-2 space-y-4">
//                   <SectionHeader title="Certificates & Achievements" emoji="🏆" />
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {consultant.certificates.map((cert, idx) => (
//                       <div key={idx} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-4 border border-yellow-200 hover:border-orange-300 transition-colors">
//                         <a href={cert.fileUrl} target="_blank" className="text-orange-700 hover:text-orange-900 font-medium transition-colors flex items-center space-x-2">
//                           <span>🏅</span>
//                           <span>{cert.name}</span>
//                         </a>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Education Section */}
//               {consultant.education?.length > 0 && (
//                 <div className="lg:col-span-2 space-y-4">
//                   <SectionHeader title="Educational Background" emoji="🎓" />
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {consultant.education.map((edu, idx) => (
//                       <div key={idx} className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-5 border border-amber-200 hover:border-orange-300 transition-colors">
//                         <div className="space-y-2">
//                           <p className="font-bold text-orange-800 flex items-center">
//                             <span className="mr-2">🎓</span>
//                             {edu.qualification}
//                           </p>
//                           <p className="text-orange-700 font-medium">{edu.fieldOfStudy}</p>
//                           <p className="text-orange-600">{edu.university}</p>
//                           <div className="inline-flex items-center px-3 py-1 bg-orange-100 rounded-full">
//                             <span className="text-orange-700 text-sm font-medium">Class of {edu.graduationYear}</span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Helper components with warm theme
// const SectionHeader = ({ title, emoji }) => (
//   <div className="flex items-center space-x-3 pb-2 border-b-2 border-gradient-to-r from-orange-200 to-amber-200">
//     <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center text-lg border border-orange-200">
//       {emoji}
//     </div>
//     <h4 className="text-lg font-bold text-orange-800">{title}</h4>
//   </div>
// );

// const WarmDetailItem = ({ label, value, emoji }) => (
//   <div className="flex items-start space-x-3 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 hover:border-orange-200 hover:shadow-sm transition-all duration-200">
//     <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center text-sm border border-orange-200">
//       {emoji}
//     </div>
//     <div className="flex-1 min-w-0">
//       <p className="font-semibold text-orange-800 text-sm">{label}</p>
//       <div className="text-orange-700 text-sm mt-1 break-words">{value || 'Not specified'}</div>
//     </div>
//   </div>
// );

// const WarmStatusItem = ({ label, status }) => (
//   <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100">
//     <span className="font-semibold text-orange-800 text-sm">{label}</span>
//     <div className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold border-2 ${
//       status 
//         ? 'bg-green-100 text-green-800 border-green-300' 
//         : 'bg-red-100 text-red-800 border-red-300'
//     }`}>
//       <div className={`w-2 h-2 rounded-full mr-2 ${status ? 'bg-green-500' : 'bg-red-500'}`}></div>
//       {status ? 'Yes' : 'No'}
//     </div>
//   </div>
// );

// const WarmDocumentLink = ({ href, label }) => (
//   <div className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-orange-200 hover:border-orange-300 hover:shadow-sm transition-all">
//     <div className="w-6 h-6 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center text-xs">
//       📎
//     </div>
//     <a href={href} target="_blank" className="text-orange-700 hover:text-orange-900 text-sm font-medium transition-colors">
//       {label}
//     </a>
//   </div>
// );

// export default ConsultantCard;

import { useState } from 'react';

const ConsultantCard = ({ consultant, onApprove, onReject, loading }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {consultant.name}
            </h3>
            
            <div className="space-y-1 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                {consultant.email}
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {consultant.phoneNumber}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                {consultant.experience} years experience
              </span>
              <span className="text-gray-500">
                Applied {new Date(consultant.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 ml-6">
            <button
              onClick={() => onApprove(consultant._id)}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Approve
            </button>
            <button
              onClick={() => onReject(consultant._id)}
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              Reject
            </button>
          </div>
        </div>
      </div>

      {/* Toggle details button */}
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-100">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center justify-center w-full text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
        >
          <span className="mr-2">{showDetails ? "Hide Details" : "View Details"}</span>
          <svg 
            className={`w-4 h-4 transform transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Expandable details */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
        showDetails ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                Basic Information
              </h4>
              <div className="space-y-3">
                <DetailItem label="Address" value={consultant.address} />
                <DetailItem 
                  label="Resume" 
                  value={<a href={consultant.resume} target="_blank" className="text-blue-600 hover:text-blue-800 underline font-medium">View Resume</a>} 
                />
                <DetailItem label="Primary Category" value={consultant.primaryCategory} />
                <DetailItem label="Hourly Rate" value={`₹${consultant.hourlyRate}`} />
              </div>
            </div>

            {/* Professional Details */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                Professional Details
              </h4>
              <div className="space-y-3">
                <DetailItem label="Specialized Services" value={consultant.specializedServices?.join(', ')} />
                <DetailItem label="Key Skills" value={consultant.keySkills?.join(', ')} />
                <DetailItem label="Languages" value={consultant.languageProficiency?.join(', ')} />
                <DetailItem label="Availability/Week" value={consultant.availabilityPerWeek} />
                <DetailItem label="Preferred Hours" value={consultant.preferredWorkingHours} />
                <DetailItem label="Lead Time" value={consultant.bookingLeadTime} />
              </div>
            </div>

            {/* Status & Settings */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                Status & Settings
              </h4>
              <div className="space-y-3">
                <StatusItem label="Accepted Terms" status={consultant.acceptedTerms} />
                <StatusItem label="Visible on Platform" status={consultant.visibleOnPlatform} />
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                Documents
              </h4>
              <div className="space-y-2">
                <DocumentLink href={consultant.documents?.aadhaarCard} label="Aadhaar Card" />
                {consultant.documents?.panCard && <DocumentLink href={consultant.documents.panCard} label="PAN Card" />}
                {consultant.documents?.passport && <DocumentLink href={consultant.documents.passport} label="Passport" />}
              </div>
            </div>

            {/* Certificates */}
            {consultant.certificates?.length > 0 && (
              <div className="lg:col-span-2 space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                  Certificates
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {consultant.certificates.map((cert, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <a href={cert.fileUrl} target="_blank" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                        {cert.name}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {consultant.education?.length > 0 && (
              <div className="lg:col-span-2 space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 pb-2 border-b border-gray-200">
                  Education
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {consultant.education.map((edu, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="space-y-1">
                        <p className="font-semibold text-gray-900">{edu.qualification}</p>
                        <p className="text-gray-700">{edu.fieldOfStudy}</p>
                        <p className="text-gray-600 text-sm">{edu.university}</p>
                        <p className="text-gray-500 text-sm">Graduated {edu.graduationYear}</p>
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
  );
};

// Helper components
const DetailItem = ({ label, value }) => (
  <div className="flex flex-col space-y-1">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <div className="text-sm text-gray-900">{value || 'Not specified'}</div>
  </div>
);

const StatusItem = ({ label, status }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
      status 
        ? 'bg-green-100 text-green-800' 
        : 'bg-red-100 text-red-800'
    }`}>
      {status ? 'Yes' : 'No'}
    </span>
  </div>
);

const DocumentLink = ({ href, label }) => (
  <div className="flex items-center space-x-2 p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
    <a href={href} target="_blank" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
      {label}
    </a>
  </div>
);

export default ConsultantCard;