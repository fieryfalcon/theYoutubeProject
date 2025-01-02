import React, { useState } from "react";
import { auth, googleProvider } from "../utils/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile, // Firebase method to update user profile
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { upsertUser } from "../api/userApi"; // Import the API function
import InputField from "../components/InputField";
import Button from "../components/button";
import GoogleButton from "../components/GoogleButton";
import styles from "../styles/AuthForm.module.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(""); // New state for name
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const navigate = useNavigate();

  const handleUpsert = async (user) => {
    const userData = {
      email: user.email,
      name: user.displayName || name || "Anonymous",
      profilePicture: user.photoURL || "https://example.com/default-avatar.png",
      tokens: 50, // Default tokens for new users
      role: "basic",
      authProvider: user.providerData[0]?.providerId || "emailPassword",
      deleted: false,
    };

    try {
      await upsertUser(user.uid, userData); // Call the backend
      console.log("User upserted successfully");
    } catch (error) {
      console.error("Failed to upsert user:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await handleUpsert(user); // Call upsert after login
      navigate("/dashboard");
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await handleUpsert(user); // Call upsert after Google Sign-In
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update Firebase user profile with the name
      await updateProfile(user, { displayName: name });

      // Call upsert after signup
      await handleUpsert({ ...user, displayName: name });
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
      {isCreatingAccount && (
        <InputField
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      )}
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
