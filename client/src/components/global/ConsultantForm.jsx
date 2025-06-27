import React from 'react'
import ConsultantApplicationForm from '../../forms/ConsultantApplicationform'

const ConsultantForm = () => {
  return (
    
            <div className=" w-[90vw] bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-hidden">
          <div className="bg-white max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl w-full max-w-4xl relative animate-fadeIn border border-emerald-100">
            <div className="sticky top-0 bg-gradient-to-r from-emerald-500 to-green-500 p-6 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  Become a Consultant
                </h2>
                <button
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-3 transition-all duration-200 hover:rotate-90"
                  onClick={() => setShowConsultantForm(false)}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-8">
              <ConsultantApplicationForm />
            </div>
          </div>
        </div>
   
  )
}

export default ConsultantForm