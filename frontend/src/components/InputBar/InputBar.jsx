import React from "react";
import {useState, useEffect, useRef} from "react";

import Upload from "./Upload.jsx";

function InputBar({onSubmit,onUpdate,UploadClick}){
  const [value,setValue] = useState("");
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const animationRef = useRef(null);
  const charIndexRef = useRef(0);
  
  const messages = [
    "ready to find a new an amazing new career!",
    "matching your talent against ours!",
    "awaiting incredible CVs :)",
    "lot of job vacants are waiting!!"
  ];
  
  useEffect(() => {
    if (!isAnimating) {
      setAnimatedPlaceholder("");
      charIndexRef.current = 0;
      return;
    }
    
    const currentMessage = messages[currentMessageIndex];
    let timeoutId = null;
    
    // Clear previous animation
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }
    
    // Reset for new message
    charIndexRef.current = 0;
    setAnimatedPlaceholder("");
    
    // Start typing animation
    animationRef.current = setInterval(() => {
      if (charIndexRef.current < currentMessage.length) {
        setAnimatedPlaceholder(currentMessage.slice(0, charIndexRef.current + 1));
        charIndexRef.current++;
      } else {
        // Finished typing, wait then move to next message
        if (animationRef.current) {
          clearInterval(animationRef.current);
          animationRef.current = null;
        }
        timeoutId = setTimeout(() => {
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    }, 100);
    
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
        animationRef.current = null;
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentMessageIndex, isAnimating]);
  
  const handleChange = (e) => {
    setValue(e.target.value);
    setIsAnimating(false);
    if (onUpdate) onUpdate(e.target.value);
  };
  
  const handleFocus = () => {
    setIsAnimating(false);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit && value.trim() !== "") {
      onSubmit(value)
      setValue("");
    }
  };

  const handleUpload = () => {
    UploadClick();
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 10,
      padding: '0 1rem'
    }}>
      <form 
        onSubmit={handleSubmit} 
        style={{
          width: '100%',
          maxWidth: '56rem',
          display: 'flex',
          gap: '1rem',
          padding: '1.5rem',
          alignItems: 'center'
        }}
      >
        <input
          type="search"
          value={value}
          onChange={handleChange}
          placeholder={isAnimating ? animatedPlaceholder : "Brand new job opportunities..."}
          aria-label="Search for job opportunities"
          style={{
            flex: 1,
            padding: '1rem 1.25rem',
            fontSize: '1rem',
            borderRadius: '9999px',
            border: '2px solid rgb(233, 213, 255)',
            backgroundColor: 'white',
            color: '#1f2937',
            outline: 'none',
            transition: 'all 0.2s',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
          }}
          onFocus={(e) => {
            handleFocus();
            e.target.style.borderColor = 'rgb(196, 181, 253)';
            e.target.style.boxShadow = '0 0 0 4px rgba(196, 181, 253, 0.3)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgb(233, 213, 255)';
            e.target.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
          }}
        />
        <Upload clicked={handleUpload}/>
        <button 
          type="submit"
          aria-label="Submit search"
          style={{
            padding: '1rem 1.75rem',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: '9999px',
            background: 'linear-gradient(to right, rgb(147, 51, 234), rgb(126, 34, 206))',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'linear-gradient(to right, rgb(126, 34, 206), rgb(107, 33, 168))';
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'linear-gradient(to right, rgb(147, 51, 234), rgb(126, 34, 206))';
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
          }}
          onMouseDown={(e) => {
            e.target.style.transform = 'scale(0.95)';
          }}
          onMouseUp={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
        >
          Go
        </button>
      </form>
    </div>
  );
}

export default InputBar;
