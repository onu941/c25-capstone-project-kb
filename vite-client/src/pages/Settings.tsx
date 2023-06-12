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

export default function Settings() {
  const [isSelected, setIsSelected] = useState<string>("bookings");
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const handleClick = (string: string) => {
    return setIsSelected(string);
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
          <SettingsTab handleClick={handleClick} isSelected={isSelected} />
          {isSelected === "bookings" && <SetBookings />}
          {isSelected === "rooms" && <SetRooms />}
          {isSelected === "general" && <SetGeneral />}
        </ResponsiveContainer>
      </FullScreen>
      <Tab />
    </>
  );
}
