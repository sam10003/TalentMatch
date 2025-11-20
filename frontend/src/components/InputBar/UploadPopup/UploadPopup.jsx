import React from "react";
import {useState, useRef, useEffect} from "react";

function UploadPopup({onClose}) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type === 'application/pdf' || 
      file.type === 'application/msword' || 
      file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.name.endsWith('.pdf') || 
      file.name.endsWith('.doc') || 
      file.name.endsWith('.docx')
    );

    if (validFiles.length > 0) {
      console.log("Files dropped:", validFiles);
      // Handle file upload here
    } else if (files.length > 0) {
      console.warn("Invalid file type. Please upload .pdf, .doc, or .docx files.");
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const validFiles = files.filter(file => 
        file.type === 'application/pdf' || 
        file.type === 'application/msword' || 
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.name.endsWith('.pdf') || 
        file.name.endsWith('.doc') || 
        file.name.endsWith('.docx')
      );
      
      if (validFiles.length > 0) {
        console.log("Files selected:", validFiles);
        // Handle file upload here
      }
    }
    // Reset input to allow selecting same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleButtonClick = (fileType) => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = fileType === 'pdf' 
        ? '.pdf' 
        : '.doc,.docx';
      fileInputRef.current.click();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div 
      className="
        fixed
        inset-0
        bg-purple-900/30
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
      "
      onClick={handleBackdropClick}
    >
      <div className="
        bg-white
        flex
        flex-col
        w-full
        max-w-2xl
        min-h-[500px]
        rounded-3xl
        shadow-2xl
        border-2
        border-purple-200
        p-8
        mx-4
        relative
      ">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close upload popup"
          className="
            absolute
            top-4
            right-4
            w-8
            h-8
            flex
            items-center
            justify-center
            rounded-full
            text-gray-400
            hover:text-gray-600
            hover:bg-purple-50
            transition-all
            duration-200
            focus:outline-none
            focus:ring-2
            focus:ring-purple-300
          "
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          className="hidden"
          accept=".pdf,.doc,.docx"
          multiple
        />
        
        {/* Draggable Area */}
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            flex-1
            flex
            flex-col
            items-center
            justify-center
            border-2
            border-dashed
            rounded-2xl
            p-12
            mb-6
            transition-all
            duration-200
            ${isDragging 
              ? 'border-purple-500 bg-purple-50 scale-105' 
              : 'border-purple-300 bg-purple-50/30 hover:border-purple-400 hover:bg-purple-50/50'
            }
          `}
        >
          <svg 
            className="w-16 h-16 text-purple-400 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
            />
          </svg>
          <p className="text-gray-600 text-lg font-medium mb-2">
            {isDragging ? "Drop your files here" : "Drag and drop your files here"}
          </p>
          <p className="text-gray-400 text-sm">
            Supports .pdf, .doc, and .docx files
          </p>
        </div>

        {/* Import Buttons */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => handleButtonClick('pdf')}
            className="
              px-6
              py-3
              text-base
              font-semibold
              rounded-full
              bg-gradient-to-r
              from-purple-600
              to-purple-700
              text-white
              hover:from-purple-700
              hover:to-purple-800
              focus:outline-none
              focus:ring-4
              focus:ring-purple-300
              transition-all
              duration-200
              shadow-lg
              hover:shadow-xl
              transform
              hover:scale-105
              active:scale-95
              flex
              items-center
              gap-2
            "
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
            Import PDF
          </button>
          
          <button
            onClick={() => handleButtonClick('doc')}
            className="
              px-6
              py-3
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
              shadow-md
              hover:shadow-lg
              transform
              hover:scale-105
              active:scale-95
              flex
              items-center
              gap-2
            "
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
            Import DOC
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadPopup;

