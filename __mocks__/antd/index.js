import React from "react";

export const Slider = ({ value, onChange, ...props }) => {
  return (
    <input
      type="range"
      data-testid="mockedSlider"
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

// If you need to mock other components from antd, add them here.
