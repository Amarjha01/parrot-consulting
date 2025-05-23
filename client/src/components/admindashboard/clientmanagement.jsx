import { useState } from 'react';

const ConsultantCard = ({ consultant, onApprove, onReject, loading }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="group relative">
      {/* Animated background with warm gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 rounded-3xl transform transition-all duration-500 group-hover:scale-105 opacity-0 group-hover:opacity-100"></div>
      
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
    <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center text-lg border border-orange-200">
      {emoji}
    </div>
    <h4 className="text-lg font-bold text-orange-800">{title}</h4>
  </div>
);

const WarmDetailItem = ({ label, value, emoji }) => (
  <div className="flex items-start space-x-3 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 hover:border-orange-200 hover:shadow-sm transition-all duration-200">
    <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center text-sm border border-orange-200">
      {emoji}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-semibold text-orange-800 text-sm">{label}</p>
      <div className="text-orange-700 text-sm mt-1 break-words">{value || 'Not specified'}</div>
    </div>
  </div>
);

const WarmStatusItem = ({ label, status }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100">
    <span className="font-semibold text-orange-800 text-sm">{label}</span>
    <div className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold border-2 ${
      status 
        ? 'bg-green-100 text-green-800 border-green-300' 
        : 'bg-red-100 text-red-800 border-red-300'
    }`}>
      <div className={`w-2 h-2 rounded-full mr-2 ${status ? 'bg-green-500' : 'bg-red-500'}`}></div>
      {status ? 'Yes' : 'No'}
    </div>
  </div>
);

const WarmDocumentLink = ({ href, label }) => (
  <div className="flex items-center space-x-3 p-3 rounded-xl bg-white border border-orange-200 hover:border-orange-300 hover:shadow-sm transition-all">
    <div className="w-6 h-6 bg-gradient-to-br from-orange-100 to-amber-100 rounded-full flex items-center justify-center text-xs">
      📎
    </div>
    <a href={href} target="_blank" className="text-orange-700 hover:text-orange-900 text-sm font-medium transition-colors">
      {label}
    </a>
  </div>
);

export default ConsultantCard;