import { useState, useEffect } from "react";
import { auth } from "../firebaseConfig";

const Codes = () => {
  const [codes, setCodes] = useState([]);
  const [loadingState, setLoadingState] = useState("idle");
  // "idle" | "loading" | "waking" | "error" | "done"

  const user = auth.currentUser;

  // helper with timeout
  const fetchWithTimeout = (url, options, timeout = 15000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timeout")), timeout)
      ),
    ]);
  };

  const loadCodes = async (uid) => {
    try {
      const response = await fetchWithTimeout(
        `https://auth-code-manager.onrender.com/api/codes/${uid}`,
        {},
        15000 // 15 sec timeout
      );
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      return data.codes || [];
    } catch (error) {
      console.error("Error loading codes:", error);
      throw error;
    }
  };

  const saveCodes = async (uid, codes) => {
    try {
      const response = await fetch(
        `https://auth-code-manager.onrender.com/api/codes/${uid}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ codes }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error saving codes:", error);
    }
  };

  useEffect(() => {
    if (!user) return;

    let retryCount = 0;
    const maxRetries = 3;

    const fetchUserCodes = async () => {
      setLoadingState("loading");

      // show "waking up" if >7s
      const wakingTimer = setTimeout(() => {
        setLoadingState("waking");
      }, 7000);

      try {
        const data = await loadCodes(user.uid);
        clearTimeout(wakingTimer);
        setCodes(data);
        setLoadingState("done");
      } catch (err) {
        clearTimeout(wakingTimer);
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying... attempt ${retryCount}`);
          setTimeout(fetchUserCodes, 5000); // retry after 5s
        } else {
          setLoadingState("error");
        }
      }
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
          marginLeft: "20px",
        }}
      >
        <h4>Fetched Codes</h4>
        {loadingState === "loading" && <p>Loading...</p>}
        {loadingState === "waking" && (
          <p>Server is waking up, please wait a moment...</p>
        )}
        {loadingState === "error" && (
          <p>Could not load codes. Please try again later.</p>
        )}
        {loadingState === "done" &&
          (codes.length > 0 ? (
            <ul>
              {codes.map((code, idx) => (
                <li key={idx}>{code}</li>
              ))}
            </ul>
          ) : (
            <p>No codes yet...</p>
          ))}
      </div>
    </div>
  );
};

export default Codes;
