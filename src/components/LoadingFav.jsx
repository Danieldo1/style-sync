import React from 'react'

const LoadingFav = () => {
  return (
    <div className="bg-gray-200 my-5 relative rounded-xl p-5 animate-pulse">
      <div className="grid grid-cols-2 justify-self-center gap-5">
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="bg-gray-300 h-40 w-40 rounded-lg"></div>
        </div>
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="bg-gray-300 h-40 w-40 rounded-lg"></div>
        </div>
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="bg-gray-300 h-40 w-40 rounded-lg"></div>
        </div>
        <div className="relative flex items-center justify-center w-full h-full">
          <div className="bg-gray-300 h-40 w-40 rounded-lg"></div>
        </div>
      </div>
      <div className="absolute top-2 right-2 p-2 z-[8] rounded-md bg-gray-300 h-8 w-8"></div>
    </div>
  );
}

export default LoadingFav