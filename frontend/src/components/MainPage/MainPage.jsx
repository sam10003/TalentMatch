
import React from "react";
import {useState} from "react";

import InputBar from "./../InputBar/InputBar.jsx";
import UploadPopup from "./../InputBar/UploadPopup/UploadPopup.jsx";
import ParticleBackground from "./ParticleBackground.jsx";

function MainPage() {
  const [uploadPopup,setUploadPopup] = useState(false);

  const handleSubmit = (value) => {
    // TODO: Implement search submission
    console.log("Submitted:", value);
  };
  
  const handleUpdate = (value) => {
    // TODO: Implement search updates/debouncing
    // console.log("is typing:", value);
  };

  const handleUpload = () => {
    setUploadPopup(!uploadPopup);
  };

  const handleClosePopup = () => {
    setUploadPopup(false);
  };

  return (
    <div className="relative">
      <ParticleBackground />
      <InputBar
        onSubmit={handleSubmit}
        onUpdate={handleUpdate}
        UploadClick={handleUpload}
      />
      {uploadPopup && <UploadPopup onClose={handleClosePopup}/>}
    </div>
  );
}

export default MainPage;
