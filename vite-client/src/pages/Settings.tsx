import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
import { AppHeader } from "../components/minicomponents/Headers";
import { useState } from "react";
import { SettingsTab, Tab } from "../components/minicomponents/Tab";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { SetBookings } from "../components/SetBookings";
import { SetGeneral } from "../components/SetGeneral";
import { SetRooms } from "../components/SetRooms";
import { useAppDispatch } from "../app/hook";
import { settings } from "../redux/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function Settings() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const settingsTab = useSelector((state: RootState) => state.user.settings);

  const dispatch = useAppDispatch();

  const handleClick = (string: string) => {
    dispatch(settings(string));
  };

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  return (
    <>
      <FullScreen>
        <ResponsiveContainer>
          <AppHeader
            title="Settings & Management"
            toggleSidebar={toggleSidebar}
          />
          <Sidebar
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
          ></Sidebar>
          <SettingsTab handleClick={handleClick} isSelected={settingsTab} />
          {settingsTab === "bookings" && <SetBookings />}
          {settingsTab === "rooms" && <SetRooms />}
          {settingsTab === "general" && <SetGeneral />}
        </ResponsiveContainer>
      </FullScreen>
      <Tab />
    </>
  );
}
