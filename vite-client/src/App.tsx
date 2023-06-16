import { Routes, Route, Navigate } from "react-router-dom";
import { FullScreen } from "./components/minicomponents/Containers";
import HandleUser from "./pages/HandleUser";
import { Search } from "./pages/Search";
import NewRoom from "./pages/NewRoom";
import { Dashboard } from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Booking from "./pages/Booking";
import Partyroom from "./pages/Partyroom";
import Landing from "./pages/Landing";
import { AuthGuard } from "./AuthGuard";
import Test from "./pages/Test";
import NotFound404 from "./pages/NotFound404";

function App() {
  return (
    <FullScreen>
      <Routes>
        <Route path="/handle_user" element={<HandleUser />} />
        <Route path="/partyroom" element={<Partyroom />} />
        <Route path="/search" element={<Search />} />
        <Route element={<AuthGuard />}>
          <Route path="/test" element={<Test />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/new_room" element={<NewRoom />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/" element={<Navigate to="/landing" replace />} />
          <Route path="*" element={<NotFound404 />} />{" "}
        </Route>
      </Routes>
    </FullScreen>
  );
}

export default App;
