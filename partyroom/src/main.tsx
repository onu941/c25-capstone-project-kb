import React from "react";
import ReactDOM from "react-dom/client";
import HandleUser from "./pages/HandleUser.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
