import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FullScreen } from "./components/Containers";
import Signup from "./Signup";
import Login from "./Login";

function App() {
  return (
    <>
      <FullScreen>
        <nav>
          <ul>
            <li>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </FullScreen>
    </>
  );
}

export default App;
