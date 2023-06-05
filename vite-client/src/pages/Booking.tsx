import { useState } from "react";
import { FullScreen } from "../components/Containers";
import { AppHeader, BodyHeader, ReviewHeader } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Tab } from "../components/Tab";
import { PrimaryButton } from "../components/Buttons";
import { BookingCard, OwnerCard } from "../components/Cards";
import { TextArea } from "../components/Inputs";

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
          <PrimaryButton isCentered label="Go to Partyroom" />
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
