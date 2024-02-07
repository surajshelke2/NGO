import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../json/PageNotFound.json';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <Lottie animationData={animationData} />
      </div>
      <p className="mt-4">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
