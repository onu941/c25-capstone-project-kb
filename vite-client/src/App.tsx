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
import Settings from "./pages/Settings";
import Booking from "./pages/Booking";
import Partyroom from "./pages/Partyroom";

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
          <Route path="/chats" element={<Chats />} />
          <Route path="/example" element={<Example />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/partyroom" element={<Partyroom />} />
          <Route path="/" element={<Navigate to="/landing" replace />} />
        </Routes>
      </FullScreen>
    </>
  );
}

export default App;
