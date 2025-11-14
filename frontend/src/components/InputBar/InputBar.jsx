import { useState } from "react";
import "./InputBar.css";

export default function InputBar({ placeholder = "lets look for your next job..", onSubmit }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div className="search-box">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button type="submit" className="right-btn">Go</button>
      </div>
    </form>
  );
}
