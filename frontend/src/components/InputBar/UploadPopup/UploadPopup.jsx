import React from "react";

function UploadPopup() {
  return (
    <div className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    ">
      <div className="
        bg-gray-300
        flex
        items-center
        justify-center
        w-[150px]
        h-[150px]
        max-w-[calc(120vw-2rem)]
        max-h-[calc(120vh-2rem)]
        min-w-[500px]
        min-h-[500px]
        rounded-lg
      "></div>
    </div>
  );
}

export default UploadPopup;

