import { useState } from "react";
import { FullScreen } from "../components/Containers";
import { AppHeader } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Tab } from "../components/Tab";

export default function Partyroom() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [partyroomName, setPartyroomName] = useState(
    "name fetched from postgres via knex query"
  );

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };
  return (
    <>
      <FullScreen>
        <AppHeader
          isOpen={sidebarIsOpen}
          toggleSidebar={toggleSidebar}
          title={partyroomName}
        ></AppHeader>
        <Sidebar isOpen={sidebarIsOpen} toggleSidebar={toggleSidebar}></Sidebar>
      </FullScreen>
      <Tab />
    </>
  );
}
