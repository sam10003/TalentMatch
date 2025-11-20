
import React from "react";

function Upload({clicked}){
  const togglePopup = () => clicked();

  return (<div>
      <button 
        type="button" 
        onClick={togglePopup}
        aria-label="Upload files"
        className="
          px-5
          py-4
          text-base
          font-semibold
          rounded-full
          bg-white
          text-purple-600
          border-2
          border-purple-300
          hover:bg-purple-50
          hover:border-purple-400
          focus:outline-none
          focus:ring-4
          focus:ring-purple-300
          transition-all
          duration-200
          shadow-sm
          hover:shadow-md
          transform
          hover:scale-105
          active:scale-95
      ">
        Upload
      </button>
  </div>);
}

export default Upload;
