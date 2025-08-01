import React from "react";

const UsefulLinks = () => {
  return (
    <div>
      <div
        style={{
          color: "black",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",

          width: "220px",
        }}
      >
        <h3>Web Development links</h3>
        <ul>
          <li>
            <a
              href="https://nodejs.org/dist/v22.14.0/node-v22.14.0-x64.msi"
              download
            >
              NodeJS
            </a>
          </li>
          <li>
            <a
              href="https://code.visualstudio.com/docs/?dv=win64user"
              download
              target="blank"
            >
              VSCode
            </a>
          </li>
          <li>
            <a
              href="https://central.github.com/deployments/desktop/desktop/latest/win32"
              download
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://central.github.com/deployments/desktop/desktop/latest/win32"
              download
            >
              Download dota skins here
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UsefulLinks;
