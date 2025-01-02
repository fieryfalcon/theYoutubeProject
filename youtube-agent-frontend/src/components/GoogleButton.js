import React from "react";
import styles from "../styles/AuthForm.module.css";

const GoogleButton = ({ onClick }) => (
  <button className={styles.googleButton} onClick={onClick}>
    Sign in with Google
  </button>
);

export default GoogleButton;
