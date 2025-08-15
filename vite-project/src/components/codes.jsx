import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig"; // your Firebase setup

const Codes = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser; // currently logged-in user
  const backendURL = "https://auth-code-manager.onrender.com"; // Render backend URL

  // Fetch codes on component mount or when user changes
  useEffect(() => {
    if (!user) return;

    const fetchCodes = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${backendURL}/api/codes/${user.uid}`);
        const data = await res.json();
        setCodes(data.codes || []); // fallback to empty array
      } catch (err) {
        console.error("Failed to fetch codes:", err);
      }
      setLoading(false);
    };

    fetchCodes();
  }, [user]);

  // Save codes to backend
  const saveCodes = async () => {
    if (!user) return;
    try {
      await fetch(`${backendURL}/api/codes/${user.uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codes }),
      });
      alert("Codes saved successfully!");
    } catch (err) {
      console.error("Failed to save codes:", err);
    }
  };

  const textAreaStyle = {
    border: "1px solid #ccc",
    minWidth: "200px",
    minHeight: "150px",
    marginRight: "20px",
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      {/* Left side: Textarea */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="codesInput">Paste your codes here:</label>
        <textarea
          id="codesInput"
          style={textAreaStyle}
          value={codes.join("\n")}
          onChange={(e) => setCodes(e.target.value.split("\n"))}
        ></textarea>
        <button onClick={saveCodes} style={{ marginTop: "10px" }}>
          Save Codes
        </button>
      </div>

      {/* Right side: Fetched/displayed codes */}
      <div
        style={{
          border: "1px solid #ccc",
          minWidth: "200px",
          minHeight: "150px",
          padding: "10px",
        }}
      >
        <h4>Fetched Codes</h4>
        {loading ? (
          <p>Loading...</p>
        ) : codes.length > 0 ? (
          <ul>
            {codes.map((code, idx) => (
              <li key={idx}>{code}</li>
            ))}
          </ul>
        ) : (
          <p>No codes yet...</p>
        )}
      </div>
    </div>
  );
};

export default Codes;
