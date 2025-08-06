import React from "react";

const Scripts = () => {
  return (
    <div
      style={{
        color: "black",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "220px",
      }}
    >
      <h3>Scripts you can run</h3>
      <ul>
        <li>
          <a href="/testScript.bat" download>
            Full Scripts
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Scripts;
