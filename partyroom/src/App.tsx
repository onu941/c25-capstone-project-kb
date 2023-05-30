import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FullScreen } from "./components/Containers";
import Signup from "./Signup";
import Login from "./Login";
import Landing from "./Landing";
import HandleUser from "./HandleUser";

function App() {
  return (
    <>
      <FullScreen>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/handle_user" element={<HandleUser />}></Route>
          <Route path="/landing" element={<Landing />}></Route>
        </Routes>
      </FullScreen>
    </>
  );
}

export default App;
