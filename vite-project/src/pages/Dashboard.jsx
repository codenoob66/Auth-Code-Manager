import React, { useState, useEffect } from "react";
import { auth, db } from "../firebaseConfig"; // Firebase setup
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import UsefulLinks from "../components/usefulLinks";

const Dashboard = () => {
  const handleLogout = () => auth.signOut();

  return (
    <div>
      <h1>Welcome to your dashboard</h1>
      <UsefulLinks />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
