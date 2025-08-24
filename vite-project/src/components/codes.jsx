import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";

const Codes = () => {
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = auth.currentUser;

  const BASE_URL = "https://auth-code-manager.onrender.com/api/codes";
  // local version of loadCodes
  const loadCodes = async (uid) => {
    try {
      const response = await fetch(`${BASE_URL}/${uid}`);
      const data = await response.json();
      return data.codes || [];
    } catch (error) {
      console.error("Error loading codes:", error);
      return [];
    }
  };

  // local version of saveCodes
  const saveCodes = async (uid, codes) => {
    try {
      const response = await fetch(`${BASE_URL}/${uid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codes }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error saving codes:", error);
    }
  };

  useEffect(() => {
    if (!user) return;

    const fetchUserCodes = async () => {
      setLoading(true);
      const data = await loadCodes(user.uid);
      setCodes(data);
      setLoading(false);
    };

    fetchUserCodes();
  }, [user]);

  const handleSaveCodes = async () => {
    if (!user) return;
    await saveCodes(user.uid, codes);
    alert("Codes saved successfully!");
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
        <button onClick={handleSaveCodes} style={{ marginTop: "10px" }}>
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
              <div key={idx}>
                <li>{code}</li>
                <button>delete</button>
              </div>
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
