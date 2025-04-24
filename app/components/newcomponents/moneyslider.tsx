import React, { useState } from "react";
import "./moneyslider.css";

interface SliderComponentProps {
  onDataUpdate: (max: number) => void;
  valb: number;
  minm: number;
}

const SliderComponent: React.FC<SliderComponentProps> = ({ onDataUpdate, valb, minm }) => {
  const [minValue, setMinValue] = useState<number>(minm);
  const [maxValue, setMaxValue] = useState<number>(valb);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
    const newValue = Number(event.target.value);

    if (type === "min" && newValue < maxValue) {
      setMinValue(newValue);
      onDataUpdate(newValue);
    } else if (type === "max" && newValue > minValue) {
      setMaxValue(newValue);
      onDataUpdate(newValue);
    }
  };

  return (
    <div className="flex flex-col items-center w-full p-4">
     

      <div className="relative w-full max-w-md">
        {/* Slider Track */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-700 rounded-full transform -translate-y-1/2" />

        {/* Progress Bar Between Min & Max Handles */}
       

        {/* Min Handle 
        <input
          type="range"
          min={minm}
          max={10000}
          step="1"
          value={minValue}
          onChange={(e) => handleChange(e, "min")}
          className="absolute w-full cursor-pointer bg-transparent appearance-none"
          style={{
            zIndex: 11,
            pointerEvents: "auto",
            position: "absolute",
          }}
        />
        */}

        {/* Max Handle */}
        <input
          type="range"
          min={minm}
          max={99999}
          step="1"
          value={maxValue}
          color="red"
          onChange={(e) => handleChange(e, "max")}
          className="absolute w-full cursor-pointer bg-transparent appearance-none"
          style={{
            zIndex: 11, // Ensure the second input is on top
            pointerEvents: "auto",
            position: "absolute",
          }}
        />
      </div>
      <div className="font-medium mt-[51px] flex">Price: ₹{minValue} - ₹{maxValue}</div>
    </div>
  );
};

export default SliderComponent;
