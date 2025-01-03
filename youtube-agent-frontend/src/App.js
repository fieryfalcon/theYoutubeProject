import React from "react";
import { HashRouter, BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import "./styles/Global.css";

function App() {
  return (
    <HashRouter>
        <AppRoutes />
    </HashRouter>
  );
}

export default App;
