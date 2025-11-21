import React, { useState, useRef, useEffect } from "react";

function CompanyPopup({ onClose }) {
  const [position, setPosition] = useState(null); // null means use flexbox centering
  const [isDragging, setIsDragging] = useState(false);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const popupRef = useRef(null);

  // Calculate center position once popup is mounted
  useEffect(() => {
    if (popupRef.current && position === null) {
      const rect = popupRef.current.getBoundingClientRect();
      const centerX = (window.innerWidth - rect.width) / 2;
      const centerY = (window.innerHeight - rect.height) / 2;
      setPosition({ x: centerX, y: centerY });
    }
  }, [position]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.draggable-header')) {
      const rect = popupRef.current.getBoundingClientRect();
      dragOffsetRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      setIsDragging(true);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && popupRef.current) {
        const rect = popupRef.current.getBoundingClientRect();
        const newX = e.clientX - dragOffsetRef.current.x;
        const newY = e.clientY - dragOffsetRef.current.y;
        
        // Constrain to viewport
        const maxX = window.innerWidth - rect.width;
        const maxY = window.innerHeight - rect.height;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY)),
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  const handleLaunchVacants = () => {
    console.log("Launch vacants clicked");
    // Add functionality here later
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && onClose) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(88, 28, 135, 0.3)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 50,
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={popupRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: position ? "absolute" : "relative",
          left: position ? `${position.x}px` : "auto",
          top: position ? `${position.y}px` : "auto",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          maxWidth: "32rem",
          minHeight: "400px",
          borderRadius: "1.5rem",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          border: "2px solid rgb(221, 214, 254)",
          padding: "2rem",
          cursor: isDragging ? "grabbing" : "default",
        }}
      >
        {/* Draggable Header */}
        <div
          className="draggable-header"
          onMouseDown={handleMouseDown}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            paddingBottom: "1rem",
            borderBottom: "1px solid rgb(221, 214, 254)",
            cursor: "grab",
          }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "rgb(88, 28, 135)",
              margin: 0,
            }}
          >
            For Companies
          </h2>
          <button
            onClick={onClose}
            aria-label="Close company popup"
            style={{
              width: "2rem",
              height: "2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9999px",
              color: "#9ca3af",
              backgroundColor: "transparent",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
              outline: "none",
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#4b5563";
              e.target.style.backgroundColor = "rgb(250, 245, 255)";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = "#9ca3af";
              e.target.style.backgroundColor = "transparent";
            }}
          >
            <svg
              style={{ width: "1.25rem", height: "1.25rem" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#4b5563",
              lineHeight: 1.6,
              margin: 0,
              marginBottom: "1.5rem",
            }}
          >
            This section is designed for companies looking to find the best talent.
            Discover how TalentMatch can help you connect with qualified candidates
            and streamline your hiring process.
          </p>

          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(250, 245, 255, 0.3)",
              borderRadius: "1rem",
              border: "2px dashed rgb(221, 214, 254)",
              padding: "2rem",
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                color: "#9ca3af",
                fontSize: "0.875rem",
                textAlign: "center",
                margin: 0,
              }}
            >
              Drag and drop your vacant information...
            </p>
          </div>

          {/* Launch Vacants Button */}
          <button
            onClick={handleLaunchVacants}
            style={{
              padding: "0.875rem 1.75rem",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: "9999px",
              background: "linear-gradient(to right, rgb(147, 51, 234), rgb(126, 34, 206))",
              color: "white",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: "0 10px 15px -3px rgba(147, 51, 234, 0.3)",
              outline: "none",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "linear-gradient(to right, rgb(126, 34, 206), rgb(107, 33, 168))";
              e.target.style.transform = "scale(1.02)";
              e.target.style.boxShadow = "0 20px 25px -5px rgba(147, 51, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "linear-gradient(to right, rgb(147, 51, 234), rgb(126, 34, 206))";
              e.target.style.transform = "scale(1)";
              e.target.style.boxShadow = "0 10px 15px -3px rgba(147, 51, 234, 0.3)";
            }}
            onMouseDown={(e) => {
              e.target.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
              e.target.style.transform = "scale(1.02)";
            }}
          >
            launch vacants!
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyPopup;

