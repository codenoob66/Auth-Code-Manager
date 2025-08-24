import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig"; // Firebase setup
import WebDevLinks from "../components/webdevlinks";
import GameLinks from "../components/gamelinks";
import Scripts from "../components/scripts";
import Codes from "../components/codes";

const Dashboard = () => {
  const [isHovered, setHovered] = useState(false);
  const { currentUser } = auth;
  const [user, setUser] = useState("");

  useEffect(() => {
    if (currentUser.email == "smurf4812@gmail.com") {
      setUser("Rafael");
    } else {
      setUser("Jacob");
    }
  }, [currentUser]);

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
      <h1>Welcome, {user}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <h1 style={{ margin: 0, fontSize: "24px" }}>
            Welcome to your dashboard
          </h1>
        </div>

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
        <div
          style={{
            flex: 1,
            padding: "20px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <WebDevLinks />
          <GameLinks />
          <Scripts />
        </div>
      </div>
      <Codes />
    </div>
  );
};

export default Dashboard;
