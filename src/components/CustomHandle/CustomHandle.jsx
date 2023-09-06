import React from "react";
import "./style.scss";

const CustomHandle = (props) => {
  const { value, dragging, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={`custom-handle ${dragging ? "dragging" : ""}`}
    >
      {value}
    </div>
  );
};

export default CustomHandle;
