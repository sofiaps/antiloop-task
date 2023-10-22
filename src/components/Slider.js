import React, { useState } from 'react';
import './Slider.css';

function Slider({ min, max, value }) {
    const [range, setRange] = useState(value);
  
    const handleRangeChange = (event) => {
      const newValue = parseInt(event.target.value, 10);
  
      if (event.target.id === 'min-handle') {
        if (newValue < range.max) {
          setRange({ min: newValue, max: range.max });
        } else {
          setRange({ min: range.max, max: range.max });
        }
      } else if (event.target.id === 'max-handle') {
        if (newValue > range.min) {
          setRange({ min: range.min, max: newValue });
        } else {
          setRange({ min: range.min, max: range.min });
        }
      }
    };
  
    return (
        <>
         <div className="range-values">
          <span>{range.min} - </span>
          <span>{range.max}</span>
        </div>
      <div className="slider-container">
        <input
          type="range"
          min={min}
          max={max}
          value={range.min}
          onChange={handleRangeChange}
          id="min-handle"
          className="range-input"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={range.max}
          onChange={handleRangeChange}
          id="max-handle"
          className="range-input"
        />
        <div className="range-line">
          <div
            className="range-fill"
            style={{
              width: `${((range.max - range.min) / (max - min)) * 100}%`,
              left: `${(range.min / (max - min)) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </>
       
    );
  }
  
  export default Slider;