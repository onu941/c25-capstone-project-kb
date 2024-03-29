import { Routes, Route, Navigate } from "react-router-dom";
import { FullScreen } from "./components/minicomponents/Containers";
import HandleUser from "./pages/HandleUser";
import { Search } from "./pages/Search";
import { Dashboard } from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Booking from "./pages/Booking";
import Partyroom from "./pages/Partyroom";
import Landing from "./pages/Landing";
import { AuthGuard } from "./AuthGuard";
import NotFound404 from "./pages/NotFound404";
import SubmitRoom from "./pages/SubmitRoom";

function App() {
  return (
    <FullScreen>
      <Routes>
        <Route path="/handle_user" element={<HandleUser />} />
        <Route element={<AuthGuard />}>
          <Route path="/partyroom" element={<Partyroom />} />
          <Route path="/search" element={<Search />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/submit_room" element={<SubmitRoom />} />
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
