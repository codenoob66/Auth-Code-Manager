import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig"; // your Firebase client setup

const Codes = () => {
  const [codes, setCodes] = useState("");
  const [savedCodes, setSavedCodes] = useState([]);

  // ✅ Save codes to backend
  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Not logged in!");

    const token = await user.getIdToken();

    await fetch("http://localhost:5000/api/codes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ codes: codes.split("\n") }), // turn textarea into array
    });

    fetchCodes();
  };

  // ✅ Fetch saved codes
  const fetchCodes = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();

    const res = await fetch("http://localhost:5000/api/codes", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    setSavedCodes(data?.codes || []);
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <p>Paste your codes here:</p>
        <textarea
          value={codes}
          onChange={(e) => setCodes(e.target.value)}
          rows="10"
          cols="30"
          style={{ border: "1px solid #ccc" }}
        />
        <br />
        <button onClick={handleSave}>Save Codes</button>
      </div>

      <div>
        <p>Saved Codes:</p>
        <ul>
          {savedCodes.map((code, i) => (
            <li key={i}>{code}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Codes;
