import React from "react";
import styles from "../styles/AuthForm.module.css";

const InputField = ({ type, placeholder, value, onChange }) => (
  <input
    className={styles.inputField}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

export default InputField;
