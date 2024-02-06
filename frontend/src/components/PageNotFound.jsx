import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../json/PageNotFound.json';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <div className="w-full max-w-xs">
        <Lottie animationData={animationData} />
      </div>
    </div>
  );
};

export default NotFound;
