import React from "react";

const Codes = () => {
  const textAreaStyle = {
    border: "1px solid #ccc",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      Paste your codes here:
      <textarea
        name="write your codes here"
        id=""
        style={textAreaStyle}
      ></textarea>
    </div>
  );
};

export default Codes;
