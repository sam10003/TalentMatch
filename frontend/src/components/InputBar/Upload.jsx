
import React from "react";
import {useState} from "react";

function Upload({clicked}){
  const togglePopup = () => clicked();

  return (<div>
      <button type="button" onClick={togglePopup} className="
        px-4
	py-2
      ">
        Upload
      </button>
  </div>);
}

export default Upload;
