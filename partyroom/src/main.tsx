import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./Landing.tsx";
import Login from "./Login.tsx";
import Signup from "./Signup.tsx";
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
