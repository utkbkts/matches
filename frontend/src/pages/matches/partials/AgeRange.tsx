import React, { useState } from "react";
interface Props {
  handleAgeRange: (minAge: number, maxAge: number) => void;
}

const AgeRange = ({ handleAgeRange }: Props) => {
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(50);

  // Handle the change in either min or max age slider
  const handleRangeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "min" | "max"
  ) => {
    const value = Number(e.target.value);

    // If the user changes the min value
    if (type === "min") {
      // Min value should not be greater than max value
      if (value <= maxAge) {
        setMinAge(value); // Update min age in state
        handleAgeRange(value, maxAge); // Pass updated minAge and maxAge to parent
      }
    } else {
      // If the user changes the max value
      if (value >= minAge) {
        setMaxAge(value); // Update max age in state
        handleAgeRange(minAge, value); // Pass updated minAge and maxAge to parent
      }
    }
  };

  return (
    <div className="containerr ">
      <span className="text-gray-600 flex items-center justify-between w-[400px]">
        Age Range{" "}
        <span>
          {minAge} - {maxAge}
        </span>
      </span>
      <div className="range-slider">
        <div
          className="progress"
          style={{
            left: `${((minAge - 18) / (50 - 18)) * 100}%`,
            right: `${((50 - maxAge) / (50 - 18)) * 100}%`,
          }}
        />
        <input
          type="range"
          className="range-min"
          min="18"
          max="50"
          value={minAge}
          onChange={(e) => handleRangeChange(e, "min")}
        />
        <input
          type="range"
          className="range-max"
          min="18"
          max="50"
          value={maxAge}
          onChange={(e) => handleRangeChange(e, "max")}
        />
      </div>
    </div>
  );
};

export default AgeRange;
