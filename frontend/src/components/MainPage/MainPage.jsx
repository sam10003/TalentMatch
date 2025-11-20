
import React from "react";
import {useState} from "react";

import InputBar from "./../InputBar/InputBar.jsx";
import UploadPopup from "./../InputBar/UploadPopup/UploadPopup.jsx"

function MainPage() {
  const [uploadPopup,setUploadPopup] = useState(false);

  const handleSubmit = (value) => {
    console.log("Submitted:", value);
  };
  
  const handleUpdate = (value) => {
    console.log("is typing:", value);
  };

  const handleUpload = () => {
    setUploadPopup(!uploadPopup);
  };

  return (
    <div>
      <InputBar
        onSubmit={handleSubmit}
        onUpdate={handleUpdate}
        UploadClick={handleUpload}
      />
      {uploadPopup && <UploadPopup/>}
    </div>
  );
}

export default MainPage;
