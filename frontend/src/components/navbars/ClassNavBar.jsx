import React from "react";
import img from "../../img/logo.png";

const ClassNavBar = () => {
  return (
    <nav className="sm:px-6 lg:px-8 w-full px-18 py-2 sticky top-0 z-50 bg-white">
      <div className="flex items-center justify-between h-16">
        <div className="flex-shrink-0">
          <img src={img} className="h-20 p-1 w-21" alt="Logo" />
        </div>
        <div className="flex sm:hidden md:flex  md:space-x-4">
          <button
            type="submit"
            onClick={() => {
              alert("This feature is not available yet!");
            }}
            className="inline-flex bg-blue-600 border-2 p-2 rounded-lg border-transparent text-white"
          >
            Teacher Info
          </button>
          <button
            type="submit"
            className=" bg-red-500 border-2 p-2 rounded-lg border-transparent text-white"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ClassNavBar;
