import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { FullScreen } from "./components/Containers";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import HandleUser from "./pages/HandleUser";
import { Search } from "./pages/Search";
import NewRoom from "./components/NewRoom";
import { Chats } from "./pages/Chats";

function App() {
  return (
    <>
      <FullScreen>
        <Routes>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/handle_user" element={<HandleUser />}></Route>
          <Route path="/landing" element={<Landing />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/new_room" element={<NewRoom />}></Route>
          <Route path="/chats" element={<Chats />}></Route>
        </Routes>
      </FullScreen>
    </>
  );
}

export default App;
