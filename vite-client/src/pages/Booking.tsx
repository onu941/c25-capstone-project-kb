import { useState, useEffect } from "react";
import { FullScreen } from "../components/minicomponents/Containers";
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
} from "../components/minicomponents/Buttons";
import { BookingCard, OwnerCard } from "../components/minicomponents/Cards";
import { TextArea } from "../components/minicomponents/Inputs";
import { Link } from "react-router-dom";

export default function Booking() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [showReviewSection, setShowReviewSection] = useState(false);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  const isPastDateTime = (targetDate: Date) => {
    const currentDate = new Date();
    return currentDate > targetDate;
  };

  useEffect(() => {
    const targetDate = new Date(2023, 5, 18, 16, 0, 0); // replace with database data
    const checkTime = () => {
      if (isPastDateTime(targetDate)) setShowReviewSection(true);
    };

    const timer = setInterval(checkTime, 1000);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <>
      <FullScreen>
        <AppHeader
          isOpen={sidebarIsOpen}
          toggleSidebar={toggleSidebar}
          title="Booking Details"
        ></AppHeader>
        <Sidebar isOpen={sidebarIsOpen} toggleSidebar={toggleSidebar}></Sidebar>
        <div className="mt-10">
          <Link to="/partyroom">
            <BookingCard
              date={25}
              month="MAY"
              year={2023}
              name="Partyroom Name"
              time="19:00"
              pax={8}
              address="東涌海濱道18號"
            />
          </Link>
        </div>
        <BodyHeader title="Special Requests" />
        <div className="flex w-full place-content-center px-8 mb-12">
          <TextArea value="Special Request" />
        </div>
        <OwnerCard name="Partyroom Owner" />
        {showReviewSection && (
          <>
            <ReviewHeader />
            <div
              id="review"
              className="flex flex-wrap w-full place-content-center px-8 mb-10"
            >
              <div className="mb-6 w-full">
                <TextArea placeholder="Max 150 characters (time/date checker fn added)" />
              </div>
              <PrimaryButton
                isCentered
                type="submit"
                label="Submit Your Review"
              />
            </div>
          </>
        )}
        <div className="mt-8">
          <DangerButton isCentered label="Cancel Booking" />
        </div>
      </FullScreen>
      <Tab />
    </>
  );
}
