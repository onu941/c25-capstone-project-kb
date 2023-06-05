import { useState } from "react";
import { FullScreen } from "../components/minicomponents/Containers";
import { AppHeader } from "../components/minicomponents/Headers";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { Tab } from "../components/minicomponents/Tab";

export function Chats() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };
  return (
    <>
      <FullScreen>
        <AppHeader
          isOpen={sidebarIsOpen}
          toggleSidebar={toggleSidebar}
          title="Chat History"
        ></AppHeader>
        <Sidebar isOpen={sidebarIsOpen} toggleSidebar={toggleSidebar}></Sidebar>
      </FullScreen>
      <Tab />
    </>
  );
}
