import React from "react";


export default function Logo() {
    return (
      <div className="flex items-center">
        <div className="w-10 h-10 relative">
          <div className="absolute inset-0 bg-green-700 rounded-full"></div>
          <div className="absolute top-1 left-2 w-6 h-6 text-white">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8C12 6.9 12.9 6 14 6C15.1 6 16 6.9 16 8C16 9.1 15.1 10 14 10C12.9 10 12 9.1 12 8Z" fill="currentColor" />
              <path d="M18 14C18 14 16.5 8 14 8C11.5 8 9.27 12.47 8.16 15.28C7.93 15.74 7.49 16 7 16C6.45 16 6 15.55 6 15V14" stroke="currentColor" strokeWidth="2" />
              <path d="M7 3C4.79 3 3 4.79 3 7V17C3 19.21 4.79 21 7 21H17C19.21 21 21 19.21 21 17V7C21 4.79 19.21 3 17 3H7Z" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        </div>
        <div className="ml-2">
          <span className="font-bold text-xl text-gray-800">PARRO</span>
          <span className="block text-xs text-gray-500">CONSULT</span>
        </div>
      </div>
    );
  }