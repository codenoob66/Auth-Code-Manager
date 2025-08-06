import React, { useState } from "react";
import { auth } from "../firebaseConfig"; // Firebase setup
import WebDevLinks from "../components/webdevlinks";
import GameLinks from "../components/gamelinks";
import Scripts from "../components/scripts";

const Dashboard = () => {
  const [isHovered, setHovered] = useState(false);

  const handleLogout = () => auth.signOut();

  const logoutButtonStyle = {
    backgroundColor: isHovered ? "#d32f2f" : "#f44336",
    color: "white",
    padding: "12px 20px",
    fontSize: "13px",
    borderRadius: "6px",
    boxShadow: isHovered
      ? "0 4px 8px rgba(0, 0, 0, 0.15)"
      : "0 2px 4px rgba(0,0,0,0.1)",
    border: "none",
    transition: "all 0.3s ease",
    transform: isHovered ? "translateY(-1px)" : "none",
    cursor: "pointer",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <h1>Welcome to your dashboard</h1>
        <button
          style={logoutButtonStyle}
          onClick={handleLogout}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Logout
        </button>
      </div>
      <div style={{ display: "flex" }}>
        <WebDevLinks />
        <GameLinks />
        <Scripts />
      </div>
    </div>
  );
};

export default Dashboard;
