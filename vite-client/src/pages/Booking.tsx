import { useState, useEffect } from "react";
import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
import { AppHeader, ReviewHeader } from "../components/minicomponents/Headers";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { Tab } from "../components/minicomponents/Tab";
import {
  DangerButton,
  SubmitButton,
} from "../components/minicomponents/Buttons";
import {
  BookingCardLarge,
  OwnerCard,
} from "../components/minicomponents/Cards";
import { TextArea } from "../components/minicomponents/Inputs";
import { Toaster } from "react-hot-toast";
import sample from "../assets/img/sample_partyroom.jpg";

export default function Booking() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [showTimeSensitiveSection, setShowTimeSensitiveSection] =
    useState(false);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const isPastDateTime = (targetDate: Date) => {
    const currentDate = new Date();
    return currentDate > targetDate;
  };

  useEffect(() => {
    const targetDate = new Date(2023, 2, 18, 16, 0, 0); // replace with database data
    const checkTime = () => {
      if (isPastDateTime(targetDate)) setShowTimeSensitiveSection(true);
    };

    const timer = setInterval(checkTime, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <>
      <div>
        <Toaster />
      </div>
      <FullScreen>
        <ResponsiveContainer>
          <AppHeader
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
            title="Booking Details"
          ></AppHeader>
          <Sidebar
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
          ></Sidebar>
          {showTimeSensitiveSection && (
            <div className="my-8">
              <DangerButton isCentered label="Cancel Booking" />
            </div>
          )}
          <div className="mb-12 mt-2 columns-2 gap-8">
            <BookingCardLarge
              image={sample}
              name="Partyroom Name"
              address="18 Tung Chung Waterfront Rd"
              date={18}
              month="June"
              pax={12}
            />
            <div className="flex flex-col place-content-between">
              <OwnerCard name="Partyroom Owner" />
              <div className="mt-11 mx-16 border-solid border-2 border-slate-300 border-opacity-40 rounded-md px-8 p-4 h-32 flex items-center justify-center">
                Special Request: $ special request
              </div>
            </div>
          </div>
          {showTimeSensitiveSection && (
            <>
              <ReviewHeader />
              <div
                id="review"
                className="flex flex-wrap w-full place-content-center mb-24"
              >
                <div className="mb-8 w-full">
                  <TextArea placeholder="Max 150 characters" />
                </div>
                <SubmitButton
                  isCentered
                  type="submit"
                  label="Submit Your Review"
                />
              </div>
            </>
          )}
        </ResponsiveContainer>
      </FullScreen>
      <Tab />
    </>
  );
}
