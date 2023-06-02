import { FullScreen } from "../components/Containers";
import { AppHeader, BodyHeader } from "../components/Header";
import { useState } from "react";
import { SettingsTab, Tab } from "../components/Tab";
import { BookingCard, PartyroomCard } from "../components/Cards";
import { Sidebar } from "../components/Sidebar";

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
    <FullScreen>
      <AppHeader title="Settings & Management" toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarIsOpen} toggleSidebar={toggleSidebar}></Sidebar>
      <SettingsTab handleClick={handleClick} isSelected={isSelected} />
      {isSelected === "bookings" ? SetBookings() : null}
      {isSelected === "rooms" ? SetRooms() : null}
      {isSelected === "general" ? SetGeneral() : null}
      <Tab />
    </FullScreen>
  );
}

export function SetBookings() {
  const numBookings = 5; // change as needed
  const bookings = Array.from({ length: numBookings }, (_, i) => (
    <BookingCard
      key={i}
      date={25}
      month={"May"}
      year={2023}
      name={`Greatest Partyroom ${i + 1}`}
      time={"19:00"}
      pax={10}
      address={"18 Tung Chung Waterfront Rd"}
    />
  ));
  return <FullScreen>{bookings}</FullScreen>;
}
export function SetRooms() {
  return (
    <FullScreen>
      <PartyroomCard name="Partyroom Name" address="Address" />
    </FullScreen>
  );
}

export function SetGeneral() {
  return (
    <FullScreen>
      <div className="w-full flex place-content-center">
        <div className="dark:bg-slate-500 p-8 rounded-lg w-11/12 flex place-content-center"></div>
      </div>
    </FullScreen>
  );
}
