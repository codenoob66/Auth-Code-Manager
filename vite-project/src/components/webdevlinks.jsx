import React from "react";

const WebDevLinks = () => {
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
              href="https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/8.2.12/xampp-windows-x64-8.2.12-0-VS16-installer.exe"
              download
            >
              Xampp Installer
            </a>
          </li>
          <li>
  <a href="https://drive.google.com/file/d/1nFp0KljCxTcuAkzqMHRbx803RGml3Xw3/view?usp=drive_link" download>
    WinFormsApp1
  </a>
</li>

        </ul>
      </div>
    </div>
  );
};

export default WebDevLinks;
