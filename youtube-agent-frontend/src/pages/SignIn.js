import React, { useState } from "react";
import { auth, googleProvider } from "../utils/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/button";
import GoogleButton from "../components/GoogleButton";
import styles from "../styles/AuthForm.module.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false); // Toggle for create account form
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h1>{isCreatingAccount ? "Create Account" : "Sign In"}</h1>
      <InputField
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isCreatingAccount && (
        <InputField
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}
      {isCreatingAccount ? (
        <>
          <Button onClick={handleSignUp}>Create Account</Button>
          <Button onClick={() => setIsCreatingAccount(false)}>
            Back to Sign In
          </Button>
        </>
      ) : (
        <>
          <Button onClick={handleLogin}>Sign In</Button>
          <GoogleButton onClick={handleGoogleSignIn} />
          <Button onClick={() => setIsCreatingAccount(true)}>
            Create Account
          </Button>
          <Button onClick={handlePasswordReset}>Forgot Password</Button>
        </>
      )}
    </div>
  );
};

export default SignIn;
