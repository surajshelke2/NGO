import React from 'react';

export default function CustomSpinner(){
  return (
    <div className="flex justify-center items-center h-screen absolute z-50 w-full bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-200 bg-opacity-5">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
    </div>
  );
};
