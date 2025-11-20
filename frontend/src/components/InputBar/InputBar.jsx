
import React from "react";
import {useState, useEffect, useRef} from "react";

import Upload from "./Upload.jsx";

function InputBar({onSubmit,onUpdate,UploadClick}){
  const [value,setValue] = useState("");
  const [animatedPlaceholder, setAnimatedPlaceholder] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const animationRef = useRef(null);
  
  const messages = [
    "ready to find a new an amazing new career!",
    "matching your talent against ours!",
    "awaiting incredible CVs :)",
    "lot of job vacants are waiting!!"
  ];
  
  useEffect(() => {
    if (!isAnimating) return;
    
    const currentMessage = messages[currentMessageIndex];
    let charIndex = 0;
    let timeoutId = null;
    
    // Clear previous animation
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }
    
    // Reset placeholder
    setAnimatedPlaceholder("");
    
    // Type out the message
    animationRef.current = setInterval(() => {
      if (charIndex < currentMessage.length) {
        setAnimatedPlaceholder(currentMessage.slice(0, charIndex + 1));
        charIndex++;
      } else {
        // Wait a bit before moving to next message
        clearInterval(animationRef.current);
        timeoutId = setTimeout(() => {
          setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
        }, 2000);
      }
    }, 100);
    
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentMessageIndex, isAnimating, messages]);
  
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

  return (<div className="min-h-screen flex items-center justify-center relative z-10">
    <form onSubmit={handleSubmit} className="
      w-full
      max-w-4xl
      flex
      gap-4
      p-6
      items-center
    ">
      <input
	type="search"
	value={value}
	onChange={handleChange}
	onFocus={handleFocus}
	placeholder={isAnimating ? animatedPlaceholder : "Brand new job opportunities..."}
	aria-label="Search for job opportunities"
        className="
          flex-1
          px-5
          py-4
          text-base
          rounded-full
          border-2
          border-purple-200
          bg-white
          text-gray-800
          placeholder-gray-400
          focus:outline-none
          focus:ring-4
          focus:ring-purple-300
          focus:border-purple-400
          transition-all
          duration-200
          shadow-sm
          hover:border-purple-300
    "/>
      <Upload clicked={handleUpload}/>
      <button 
        type="submit"
        aria-label="Submit search"
        className="
          px-7
          py-4
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
      ">Go</button>
    </form>
  </div>);
}

export default InputBar;
