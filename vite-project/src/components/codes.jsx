// frontend/src/components/Codes.jsx
import React, { useEffect, useState } from "react";

const Codes = () => {
  const [codes, setCodes] = useState([]);
  const [newCode, setNewCode] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch codes from backend
  const fetchCodes = async () => {
    try {
      const token = await window.firebase.auth().currentUser.getIdToken();
      const res = await fetch("http://localhost:5000/api/users/codes", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCodes(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching codes:", err);
      setLoading(false);
    }
  };

  // Add new code
  const addCode = async (e) => {
    e.preventDefault();
    if (!newCode.trim()) return;

    try {
      const token = await window.firebase.auth().currentUser.getIdToken();
      const res = await fetch("http://localhost:5000/api/users/codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code: newCode }),
      });

      const data = await res.json();
      setCodes(data);
      setNewCode("");
    } catch (err) {
      console.error("Error adding code:", err);
    }
  };

  useEffect(() => {
    fetchCodes();
  }, []);

  if (loading) return <p>Loading codes...</p>;

  return (
    <div className="p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-3">Your Codes</h2>

      {/* List codes */}
      <ul className="mb-4 space-y-2">
        {codes.length === 0 ? (
          <li className="text-gray-500">No codes yet.</li>
        ) : (
          codes.map((code, idx) => (
            <li key={idx} className="p-2 border rounded bg-gray-100">
              {code}
            </li>
          ))
        )}
      </ul>

      {/* Add new code */}
      <form onSubmit={addCode} className="flex gap-2">
        <input
          type="text"
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
          placeholder="Enter a code"
          className="border p-2 rounded flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Codes;
