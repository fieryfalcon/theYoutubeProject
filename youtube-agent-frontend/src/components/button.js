import React from "react";
import styles from "../styles/AuthForm.module.css";

const Button = ({ onClick, children }) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);

export default Button;
