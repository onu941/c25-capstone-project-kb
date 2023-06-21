import { useState } from "react";
import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
import { AppHeader } from "../components/minicomponents/Headers";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { Tab } from "../components/minicomponents/Tab";

export function Dashboard() {
  const token = localStorage.getItem("token")
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const fetchData = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_SERVER}/etl_booking/data`, {
      headers: {
        Authorization: `Bearer ${token}`,
     }
    })

    const responseData = await response.json(;)
  }
  
  return (
    <>
      <FullScreen>
        <ResponsiveContainer>
          <AppHeader
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
            title="Performance Analysis"
          ></AppHeader>
          <Sidebar
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
          ></Sidebar>
          
        </ResponsiveContainer>
      </FullScreen>
      <Tab />
    </>
  );
}
