import React from 'react'

export default function Loader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br  rounded-2xl shadow-inner">
      
      {/* Animated Spinner */}
      <div className="relative flex items-center justify-center">
        <div className="w-20 h-20 rounded-full border-4 border-pink-200 animate-spin border-t-pink-500"></div>
        <div className="absolute w-12 h-12 rounded-full bg-pink-100 animate-pulse"></div>
      </div>

      {/* Text */}
      <h2 className="mt-6 text-2xl font-bold text-gray-800 tracking-wide">
        Loading
      </h2>
      <p className="mt-2 text-gray-500 text-sm">
        Preparing your learning experience ✨
      </p>

      {/* Dots */}
      <div className="flex gap-2 mt-4">
        <span className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-purple-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
        <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
      </div>
    </div>
  );

}
