import { useEffect, useState } from "react";
import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
import { AppHeader, BodyHeader } from "../components/minicomponents/Headers";
import { LandingCarousel } from "../components/minicomponents/Carousels";
import {
  BookingCard,
  BookingCardLarge,
} from "../components/minicomponents/Cards";
import { PrimaryButton } from "../components/minicomponents/Buttons";
import { Link } from "react-router-dom";
import { Tab } from "../components/minicomponents/Tab";
import { Sidebar } from "../components/minicomponents/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch } from "../app/hook";
import { useLocation } from "react-router-dom";
import sample from "../assets/sample_partyroom.jpg";

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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get("user_id");

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [username, setUsername] = useState("");

  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = localStorage.getItem("token");
      const params = new URLSearchParams(window.location.search);
      const userId = params.get("user_id");
      const response = await fetch(`http://localhost:3000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const userDetails = await response.json();
      const name = userDetails.user.name;
      setUsername(name);
    };

    fetchUserDetails();

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
          <div className="w-full px-6 md:px-96 mb-16">
            <BookingCardLarge
              image={sample}
              alt="sample"
              name="Partyroom Name"
              address="18 Tung Chung Waterfront Rd"
              date={25}
              month="May"
              pax={8}
            />
          </div>
          <hr className="md:mx-0 mx-8 mt-10 mb-8 border-slate-500"></hr>
          <BodyHeader title="Your room has been booked!"></BodyHeader>
          <div className="w-full px-6 md:px-96 mb-8">
            <BookingCardLarge
              image={sample}
              alt="sample"
              name="Partyroom Name"
              address="18 Tung Chung Waterfront Rd"
              date={25}
              month="May"
              pax={8}
            />
          </div>
          <div className="w-full flex place-content-center pt-6">
            <Link to="/new_room">
              <PrimaryButton label="Submit a New Room" />
            </Link>
          </div>
          <hr className="md:mx-0 mx-8 mt-10 mb-8 border-slate-500"></hr>
          <BodyHeader title="Explore new partyrooms:"></BodyHeader>
          <div className=" w-full md:px-0 px-4 mb-12">
            <LandingCarousel image={sample}></LandingCarousel>
          </div>
          <div className="flex justify-center mb-24">
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
