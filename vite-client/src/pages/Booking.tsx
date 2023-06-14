import { useState, useEffect } from "react";
import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
import {
  AppHeader,
  BodyHeader,
  ReviewHeader,
} from "../components/minicomponents/Headers";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { Tab } from "../components/minicomponents/Tab";
import {
  DangerButton,
  PrimaryButton,
  SubmitButton,
} from "../components/minicomponents/Buttons";
import {
  BookingCard,
  BookingCardLarge,
  OwnerCard,
} from "../components/minicomponents/Cards";
import { TextArea } from "../components/minicomponents/Inputs";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import sample from "../assets/sample_partyroom.jpg";

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
          <div className="my-12 columns-2 gap-8">
            <BookingCardLarge
              image={sample}
              name="Partyroom Name"
              address="18 Tung Chung Waterfront Rd"
              date={18}
              month="June"
              pax={12}
            />
            <div className="py-6">
              <OwnerCard name="Partyroom Owner" />
              {showTimeSensitiveSection && (
                <div className="mt-16">
                  <DangerButton isCentered label="Cancel Booking" />
                </div>
              )}
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
