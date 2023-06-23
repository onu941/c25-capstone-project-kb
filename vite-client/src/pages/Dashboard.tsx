import { useState } from "react";
import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
import { AppHeader } from "../components/minicomponents/Headers";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { Tab } from "../components/minicomponents/Tab";
import { PrimaryButton } from "../components/minicomponents/Buttons";

export function Dashboard() {
  // const token = localStorage.getItem("token");
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  // const fetchData = async () => {
  //   const response = await fetch(
  //     `${import.meta.env.VITE_API_SERVER}/etl_booking/data`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );

  //   const responseData = await response.json();
  // };

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
        <div className="w-full h-2/3 flex flex-col place-content-center place-items-center flex-wrap text-center text-2xl text-slate-300">
          <div className="mb-18">
            Our data anlaysts at Partymate have been looking at your partyrooms'
            performance!
          </div>
          <div className="py-12">
            <a
              href="https://app.powerbi.com/groups/me/reports/14fc615e-b91a-445e-84a4-082957fd4998/ReportSection2425e5bc117145b5a020?experience=power-bi"
              target="_blank"
            >
              <PrimaryButton label="Find out more here" />
            </a>
          </div>
        </div>
      </FullScreen>
      <Tab />
    </>
  );
}
