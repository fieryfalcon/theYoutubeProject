import React from "react";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/Sign-Up";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
