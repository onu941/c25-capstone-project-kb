import { useState } from "react";
import { FullScreen } from "../components/Containers";
import { AppHeader } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { BookingCard } from "../components/Cards";
import { Tab } from "../components/Tab";

export default function Test() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };
  return (
    <FullScreen>
      <AppHeader
        title="Booking History"
        isOpen={sidebarIsOpen}
        toggleSidebar={toggleSidebar}
      />
      <Sidebar isOpen={sidebarIsOpen} toggleSidebar={toggleSidebar}></Sidebar>
      <div className="mt-8">
        <BookingCard
          date={25}
          month={"May"}
          year={2023}
          name={"Partyroom Name"}
          time={"19:00"}
          pax={8}
          address={"18 Tung Chung Waterfront Road"}
        />
      </div>
      <Tab />
    </FullScreen>
  );
}
