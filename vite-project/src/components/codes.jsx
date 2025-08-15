import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";

const Codes = () => {
  const [codes, setCodes] = useState([]);
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(""); // ✅ for messages

  // Fetch codes when user logs in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      if (u) {
        setUser(u);
        fetch(`http://localhost:5000/api/codes/${u.uid}`)
          .then((res) => res.json())
          .then((data) => setCodes(data.codes || []))
          .catch(() => setStatus("❌ Failed to fetch codes"));
      }
    });
    return () => unsubscribe();
  }, []);

  // Save codes
  const handleSave = async () => {
    if (!user) {
      setStatus("⚠️ Please log in first");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/codes/${user.uid}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codes }),
      });

      if (!res.ok) throw new Error("Failed to save");

      setStatus("✅ Codes saved successfully!");
    } catch (err) {
      setStatus("❌ Failed to save codes. Try again.");
    }

    // Clear the status after a few seconds
    setTimeout(() => setStatus(""), 3000);
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
    >
      {/* Left: textarea */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="codesInput">Paste your codes here:</label>
        <textarea
          id="codesInput"
          style={{
            border: "1px solid #ccc",
            minWidth: "200px",
            minHeight: "150px",
            marginRight: "20px",
          }}
          value={codes.join("\n")}
          onChange={(e) => setCodes(e.target.value.split("\n"))}
        ></textarea>
        <button onClick={handleSave} style={{ marginTop: "10px" }}>
          Save Codes
        </button>

        {/* ✅ Status message */}
        {status && <p style={{ marginTop: "8px" }}>{status}</p>}
      </div>

      {/* Right: Display */}
      <div
        style={{
          border: "1px solid #ccc",
          minWidth: "200px",
          minHeight: "150px",
          padding: "10px",
        }}
      >
        <h4>Fetched Codes</h4>
        {codes.length > 0 ? (
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
