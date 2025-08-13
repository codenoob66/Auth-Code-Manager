import React from "react";

const Codes = () => {
  const textAreaStyle = {
    border: "1px solid #ccc",
  };

  return (
    <div>
      this is where the textarea will go
      <textarea
        name="write your codes here"
        id=""
        style={textAreaStyle}
      ></textarea>
    </div>
  );
};

export default Codes;
