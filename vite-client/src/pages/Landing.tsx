import { useEffect, useState } from "react";
import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
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
import jwt_decode from "jwt-decode";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch } from "../app/hook";
import {
  setName,
  setPhone,
  setEmail,
  setIsAdmin,
  setImageId,
  UserState,
} from "../redux/userSlice";
import { useSelector } from "react-redux";

export interface JWT {
  name: string;
  phone: string;
  email: string;
  is_admin: boolean;
  image_id: number;
  iat: number;
  exp: number;
}

export default function Landing() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [username, setUsername] = useState("");

  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: JWT = jwt_decode(token);
      console.log("decoded name: ", decoded.name);
      dispatch(setName(decoded.name));
      setUsername(decoded.name);
    }

    const successMessage = localStorage.getItem("successMessage");
    if (successMessage) toast.success(successMessage);
    localStorage.removeItem("successMessage");
  }, []);

  return (
    <>
      <FullScreen>
        <div>
          <Toaster />
        </div>

        <ResponsiveContainer>
          <AppHeader
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
            title={"Welcome, " + username}
          ></AppHeader>
          <Sidebar
            isOpen={sidebarIsOpen}
            toggleSidebar={toggleSidebar}
          ></Sidebar>
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
          <hr className="mt-10 mb-8 border-slate-500"></hr>
          <BodyHeader title="Your room has been booked!"></BodyHeader>
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
          <div className="w-full flex place-content-center pt-6">
            <Link to="/new_room">
              <PrimaryButton label="Submit a New Room" />
            </Link>
          </div>
          <hr className="mt-10 mb-8 border-slate-500"></hr>
          <BodyHeader title="Hot new partyrooms:"></BodyHeader>
          <LandingCarousel></LandingCarousel>
          <div className="flex justify-center mb-16">
            <Link to="/search">
              <PrimaryButton label="Find A Partyroom"></PrimaryButton>
            </Link>
          </div>
        </ResponsiveContainer>
      </FullScreen>
      <Tab></Tab>
    </>
  );
}
