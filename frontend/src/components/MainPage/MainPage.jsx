
import React from "react";
import {useState} from "react";

import InputBar from "./../InputBar/InputBar.jsx";
import UploadPopup from "./../InputBar/UploadPopup/UploadPopup.jsx";
import ParticleBackground from "./ParticleBackground.jsx";

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

  const handleClosePopup = () => {
    setUploadPopup(false);
  };

  return (
    <div className="relative" style={{ overflowX: 'hidden', width: '100%' }}>
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
