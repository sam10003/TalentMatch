import { useState, useEffect } from 'react'
import './App.css'

import InputBar from "./components/InputBar/InputBar";
import "./components/InputBar/InputBar.css";

export default function App() {
  const handleSearch = (query) => {
    console.log("Submitted:", query);
  };

  return (
    <div style={{ padding: "100px" }}>

      <InputBar placeholder="lets look for a new job.." onSubmit={handleSearch} />
    </div>
  );
}
