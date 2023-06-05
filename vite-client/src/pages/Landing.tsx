import { useState } from "react";
import { FullScreen } from "../components/minicomponents/Containers";
import { AppHeader, BodyHeader } from "../components/minicomponents/Headers";
import { LandingCarousel } from "../components/minicomponents/Carousels";
import { BookingCard } from "../components/minicomponents/Cards";
import { PrimaryButton } from "../components/minicomponents/Buttons";
import { Link } from "react-router-dom";
import { Tab } from "../components/minicomponents/Tab";
import { Sidebar } from "../components/minicomponents/Sidebar";
import {
  CalendarIcon,
  ChatBubbleLeftEllipsisIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";

export default function Landing() {
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
          title="Welcome, user"
        ></AppHeader>
        <Sidebar isOpen={sidebarIsOpen} toggleSidebar={toggleSidebar}></Sidebar>
        <BodyHeader title="Your next booking:"></BodyHeader>
        <Link to="/booking">
          <BookingCard
            date={25}
            month="MAY"
            year={2023}
            name="Partyroom Name"
            time="19:00"
            pax={8}
            address="東涌海濱道18號"
          ></BookingCard>
        </Link>
        <div className="w-full mb-12 flex px-12 justify-between">
          <CalendarIcon className="h-8 w-8 text-slate-300" />
          <ShareIcon className="h-8 w-8 text-slate-300" />
          <ChatBubbleLeftEllipsisIcon className="h-8 w-8 text-slate-300" />
        </div>
        <hr className="mx-8 mb-5 border-slate-500"></hr>
        <BodyHeader title="Your room is booked!"></BodyHeader>
        <Link to="/booking">
          <BookingCard
            date={25}
            month="MAY"
            year={2023}
            name="Partyroom Name"
            time="19:00"
            pax={8}
            address="東涌海濱道18號"
          ></BookingCard>
        </Link>
        <div className="w-full mb-12 flex px-12 justify-between">
          <CalendarIcon className="h-8 w-8 text-slate-300" />
          <ShareIcon className="h-8 w-8 text-slate-300" />
          <ChatBubbleLeftEllipsisIcon className="h-8 w-8 text-slate-300" />
        </div>
        <hr className="mx-8 mb-5 border-slate-500"></hr>
        <BodyHeader title="Hot new partyrooms:"></BodyHeader>
        <LandingCarousel></LandingCarousel>
        <div className="flex justify-center">
          <Link to="/search">
            <PrimaryButton label="Find A Partyroom"></PrimaryButton>
          </Link>
        </div>
      </FullScreen>
      <Tab></Tab>
    </>
  );
}
