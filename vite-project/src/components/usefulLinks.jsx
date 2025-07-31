import React from 'react'


const usefulLinks = () => {
  return (
    <div>
          <div>
            <h2>Dashboard</h2>
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
    
              width: "150px",
            }}
          >
            Useful links
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
                  
                  href={blogspotLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Skins here
                </a>
              </li>
            </ul>
          </div>
        </div>
  )
}

export default usefulLinks
