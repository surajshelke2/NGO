import React from 'react';
import Lottie from 'lottie-react'; //
import loadingAnimation from '../../json/loading.json';

const LoadingComponent = () => {
  

  return (
    <>
   
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-gray-300 flex justify-center items-center z-50">
          <Lottie animationData={loadingAnimation} />
        </div>
     
    </>
  );
};

export default LoadingComponent;
