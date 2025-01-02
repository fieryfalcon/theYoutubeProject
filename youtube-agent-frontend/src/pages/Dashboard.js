import React from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import styles from "../styles/Dashboard.module.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await auth.currentUser.delete();
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Welcome to the Dashboard</h1>
      <Button onClick={handleLogout}>Logout</Button>
      <Button onClick={handleDeleteAccount}>Delete Account</Button>
    </div>
  );
};

export default Dashboard;
