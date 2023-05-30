import React, { useState } from "react";
import { FullScreen } from "../components/Containers";
import { AppHeader, BodyHeader } from "../components/Header";
import { LandingCarousel } from "../components/Carousels";
import { BookingCard } from "../components/Cards";
import { PrimaryButton } from "../components/Buttons";
import { Link } from "react-router-dom";
import { Tab } from "../components/Tab";
import { Sidebar } from "../components/Sidebar";
import {
  CalendarIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";

export default function Landing() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <FullScreen>
        <AppHeader
          isOpen={isOpen}
          toggleSidebar={toggleSidebar}
          title="Welcome, user"
        ></AppHeader>
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar}></Sidebar>
        <BodyHeader title="Your next booking:"></BodyHeader>
        <BookingCard
          date={25}
          month="MAY"
          year={2023}
          name="Partyroom Name"
          time="19:00"
          pax={8}
          address="東涌海濱道18號"
        ></BookingCard>
        <div className="w-full mb-12 flex px-12 justify-between">
          <CalendarIcon className="h-8 w-8 text-slate-300" />
          <ShareIcon className="h-8 w-8 text-slate-300" />
          <ChatBubbleLeftIcon className="h-8 w-8 text-slate-300" />
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
