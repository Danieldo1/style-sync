import React from 'react'

const LoadingSkeleton = () => {
  return (

    <div className="border rounded-lg p-4 m-2 w-64 h-80 animate-pulse">
      <div className="bg-gray-300 w-full h-56 mb-2"></div>
      <div className="bg-gray-300 w-1/2 h-4 mb-2"></div>
      <div className="bg-gray-300 w-full h-4 mb-2"></div>
      <div className="bg-gray-300 w-1/2 h-4"></div>
    </div>
  );
};


export default LoadingSkeleton