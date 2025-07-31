import React, { useState, useEffect } from "react";
import { auth, db } from "./firebaseConfig"; // Firebase setup
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [blogspotLink, setBlogspotLink] = useState(null);

  const apiKey = "AIzaSyBgBO0RmyZ3C8Ze1stUTVv1EO7n-UyCOuk";
  const apiUrl = "https://www.googleapis.com/youtube/v3/search";
  const commentsApiUrl = "https://www.googleapis.com/youtube/v3/commentThreads";
  const channelId = "UCFbYQycybEVQzzCp6O-FzrQ";



  const handleLogout = () => auth.signOut();


  return (
    <div>
      <UsefulLinks/>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
