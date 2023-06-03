import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { FullScreen } from "./components/Containers";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import HandleUser from "./pages/HandleUser";
import { Search } from "./pages/Search";
import NewRoom from "./pages/NewRoom";
import { Chats } from "./pages/Chats";
import Example from "./components/ComboboxDemo";
import NewRoom2 from "./pages/NewRoom2";
import Settings from "./pages/Settings";

// function isLoggedIn() {
//   return true;
// }

function App() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   isLoggedIn() ? navigate("/landing") : navigate("/handle_user");
  // }, []);

  return (
    <>
      <FullScreen>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/handle_user" element={<HandleUser />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/search" element={<Search />} />
          <Route path="/new_room" element={<NewRoom />} />
          <Route path="/new_room_2" element={<NewRoom2 />} />
          <Route path="/chats" element={<Chats />} />
          <Route path="/example" element={<Example />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/" element={<Navigate to="/landing" replace />} />
        </Routes>
      </FullScreen>
    </>
  );
}

export default App;
