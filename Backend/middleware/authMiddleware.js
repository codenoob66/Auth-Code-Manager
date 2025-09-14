// middleware/authMiddleware.js
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // or use serviceAccountKey.json
});

export const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting: "Bearer <token>"

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.uid = decoded.uid; // Attach Firebase uid to request
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
