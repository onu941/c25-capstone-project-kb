import { useState } from "react";
import { FullScreen } from "../components/minicomponents/Containers";
import {
  AppHeader,
  BodyHeader,
  ReviewHeader,
} from "../components/minicomponents/Headers";
import { Sidebar } from "../components/minicomponents/Sidebar";
import { Tab } from "../components/minicomponents/Tab";
import { PrimaryButton } from "../components/minicomponents/Buttons";
import { BookingCard, OwnerCard } from "../components/minicomponents/Cards";
import { TextArea } from "../components/minicomponents/Inputs";
import { Link } from "react-router-dom";

export default function Booking() {
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
          title="Booking Details"
        ></AppHeader>
        <Sidebar isOpen={sidebarIsOpen} toggleSidebar={toggleSidebar}></Sidebar>
        <div className="mt-6 mb-4">
          <PrimaryButton isCentered label="Cancel Booking (Danger colour)" />
        </div>
        <BookingCard
          date={25}
          month="MAY"
          year={2023}
          name="Partyroom Name"
          time="19:00"
          pax={8}
          address="東涌海濱道18號"
        />
        <BodyHeader title="Special Requests" />
        <div className="flex w-full place-content-center px-8 mb-8">
          <TextArea value="Special Request" />
        </div>
        <OwnerCard name="Partyroom Owner" />
        <div className="mt-8">
          <Link to="/partyroom">
            <PrimaryButton isCentered label="Go to Partyroom" />
          </Link>
        </div>
        <ReviewHeader />
        <div className="flex w-full place-content-center px-8 mb-10">
          <TextArea placeholder="Max 150 characters" />
        </div>
        <PrimaryButton isCentered type="submit" label="Submit Your Review" />
      </FullScreen>
      <Tab />
    </>
  );
}
