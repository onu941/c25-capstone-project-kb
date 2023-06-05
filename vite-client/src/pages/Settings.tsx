import { FullScreen } from "../components/Containers";
import { AppHeader, BodyHeader } from "../components/Header";
import { useState } from "react";
import { SettingsTab, Tab } from "../components/Tab";
import { BookingCard, PartyroomCard } from "../components/Cards";
import { Sidebar } from "../components/Sidebar";
import { StandardInput } from "../components/Inputs";
import { PrimaryButton } from "../components/Buttons";
import { Link } from "react-router-dom";

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
  // you will use a map fn later on, the current Array.from method is just a placeholder
  const numBookings = 5; // change as needed
  const bookings = Array.from({ length: numBookings }, (_, i) => (
    <Link to="/booking">
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
    </Link>
  ));
  return <FullScreen>{bookings}</FullScreen>;
}
export function SetRooms() {
  return (
    <FullScreen>
      <Link to="/partyroom">
        <PartyroomCard name="Partyroom Name" address="Address" />
      </Link>
    </FullScreen>
  );
}

export function SetGeneral() {
  return (
    <FullScreen>
      <div className="w-full flex flex-col place-content-center place-items-center">
        <div className="dark:bg-slate-500 p-8 rounded-lg w-11/12 flex flex-col place-content-center mb-16">
          <span className="text-xl mb-8 font-semibold">Edit Account Info</span>
          <StandardInput value="Name" canEdit />
          <StandardInput value="Phone #" canEdit />
          <StandardInput value="Email" canEdit />
          <StandardInput value="Password" canEdit />
        </div>
        <div className="dark:bg-slate-500 px-8 py-8 rounded-lg w-11/12 flex flex-col place-content-center mb-16 w-fit">
          <span className="text-xl mb-12 font-semibold">Account Help</span>
          <div className="px-32 flex flex-col place-items-center">
            <PrimaryButton label="User Support" />
            <PrimaryButton label="Deactivate Account (Needs danger)" />
          </div>
        </div>
        <PrimaryButton label="Logout (needs other colour)" />
      </div>
    </FullScreen>
  );
}
