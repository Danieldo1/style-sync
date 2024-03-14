import React from 'react';

const LoadingWeather = () => {
  return (
    <div className="p-5 bg-primary-foreground max-w-3xl mx-auto rounded-e-xl border border-muted-foreground shadow-md shadow-muted-foreground animate-pulse">
      <div className="h-8 bg-gray-300 rounded-md mb-4"></div>
      <div className="flex items-center justify-between">
        <div>
          <div className="h-6 bg-gray-300 rounded-md w-32 mb-2"></div>
          <div className="h-6 bg-gray-300 rounded-md w-40 mb-2"></div>
        </div>
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
          <div>
            <div className="h-6 bg-gray-300 rounded-md w-32 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded-md w-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingWeather;
