// utils/codesService.js

const BASE_URL = "https://auth-code-manager.onrender.com/codes"; // adjust if needed

// Fetch codes for a user
export const fetchCodes = async (uid) => {
  try {
    const response = await fetch(`${BASE_URL}/${uid}`);
    if (!response.ok) throw new Error("Failed to fetch codes");
    const data = await response.json();
    return data.codes || [];
  } catch (error) {
    console.error("Error fetching codes:", error);
    return [];
  }
};

// Save codes for a user
export const saveCodes = async (uid, codes) => {
  try {
    const response = await fetch(`${BASE_URL}/${uid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codes }),
    });
    if (!response.ok) throw new Error("Failed to save codes");
    return true;
  } catch (error) {
    console.error("Error saving codes:", error);
    return false;
  }
};

// Helper: load codes with safe fallback
export const loadCodes = async (uid) => {
  const codes = await fetchCodes(uid);
  return codes.length ? codes : []; // ensures array fallback
};
