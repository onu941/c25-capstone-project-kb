import { useEffect, useState } from "react";
import {
  FullScreen,
  ResponsiveContainer,
} from "../components/minicomponents/Containers";
import { AppHeader, BodyHeader } from "../components/minicomponents/Headers";
import { LandingCarousel } from "../components/minicomponents/Carousels";
import { BookingCardLarge } from "../components/minicomponents/Cards";
import { PrimaryButton } from "../components/minicomponents/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { Tab } from "../components/minicomponents/Tab";
import { Sidebar } from "../components/minicomponents/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import sample from "../../public/img/sample_partyroom.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { BookingCard, RandomLandingRooms } from "../app/interface";

export default function Landing() {
  const navigate = useNavigate();
  const roomImageDirectory = "../../public/img/room/";
  const reduxUserId = useSelector((state: RootState) => state.auth.user_id);

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [partygoerDetails, setPartygoerDetails] = useState<BookingCard>({
    id: NaN,
    person_id: Number(reduxUserId),
    headcount: NaN,
    booking_date: "",
    start_time: "",
    name: "",
    address: "",
    image_filename: "",
  });
  const [hostDetails, setHostDetails] = useState<BookingCard>({
    id: NaN,
    person_id: Number(reduxUserId),
    headcount: NaN,
    booking_date: "",
    start_time: "",
    name: "",
    address: "",
    image_filename: "",
  });
  const [randomRooms, setRandomRooms] = useState<RandomLandingRooms[]>([]);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserDetails = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_SERVER}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const userDetails = await response.json();
      const name = userDetails.user.name;
      setUsername(name);
    };

    const fetchNextBookingAsPartygoer = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/booking/next/partygoer`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const bookingDetails = await response.json();
      const bookingDetailsTreated = {
        ...bookingDetails,
        booking_date: new Date(bookingDetails.booking_date).toLocaleString(
          "en-US",
          {
            timeZone: "Asia/Hong_Kong",
          }
        ),
        start_time: bookingDetails.start_time.slice(0, -3),
      };

      setPartygoerDetails(bookingDetailsTreated);
    };

    const fetchNextBookingAsHost = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/booking/next/host`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const bookingDetails = await response.json();
      console.log("host bookingDetails", bookingDetails);
      const bookingDetailsTreated = {
        ...bookingDetails,
        booking_date: new Date(bookingDetails.booking_date).toLocaleString(
          "en-US",
          {
            timeZone: "Asia/Hong_Kong",
          }
        ),
        start_time: bookingDetails.start_time.slice(0, -3),
      };

      setHostDetails(bookingDetailsTreated);
    };

    const fetchRandomRooms = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/partyroom/random`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const randomRoomsData = await response.json();
      setRandomRooms(randomRoomsData);
    };

    const fetchAllData = async () => {
      console.log("fetchAllData");
      await fetchUserDetails();
      await fetchNextBookingAsPartygoer();
      await fetchNextBookingAsHost();
      await fetchRandomRooms();

      const successMessage = localStorage.getItem("successMessage");
      if (successMessage) toast.success(successMessage);
      localStorage.removeItem("successMessage");
    };
    fetchAllData();
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
              image={roomImageDirectory + partygoerDetails.image_filename}
              onClick={() =>
                navigate(`/booking?booking_id=${partygoerDetails.id}`)
              }
              alt={partygoerDetails.image_filename}
              name={partygoerDetails.name}
              address={partygoerDetails.address}
              time={partygoerDetails.start_time}
              date={partygoerDetails.booking_date.split(/[\/\s,:]+/)[1]}
              month={new Date(
                2000,
                parseInt(
                  partygoerDetails.booking_date.split(/[\/\s,:]+/)[0],
                  10
                ) - 1
              ).toLocaleString("default", { month: "short" })}
              pax={partygoerDetails.headcount}
            />
          </div>
          <hr className="md:mx-0 mx-8 mt-10 mb-8 border-slate-500"></hr>
          <BodyHeader title="Your room has been booked!"></BodyHeader>
          <div className="w-full px-6 md:px-96 mb-8">
            <BookingCardLarge
              image={roomImageDirectory + hostDetails.image_filename}
              onClick={() => navigate(`/booking?booking_id=${hostDetails.id}`)}
              alt={hostDetails.image_filename}
              name={hostDetails.name}
              address={hostDetails.address}
              time={hostDetails.start_time}
              date={hostDetails.booking_date.split(/[\/\s,:]+/)[1]}
              month={new Date(
                2000,
                parseInt(hostDetails.booking_date.split(/[\/\s,:]+/)[0], 10) - 1
              ).toLocaleString("default", { month: "short" })}
              pax={hostDetails.headcount}
            />
          </div>
          <div className="w-full flex place-content-center pt-6">
            <Link to="/submit_room">
              <PrimaryButton label="Submit a New Room" />
            </Link>
          </div>
          <hr className="md:mx-0 mx-8 mt-10 mb-8 border-slate-500"></hr>
          <BodyHeader title="Explore new partyrooms:"></BodyHeader>
          <div className=" w-full md:px-0 px-4 mb-12">
            <LandingCarousel randomRooms={randomRooms} />
          </div>
          <div className="flex justify-center mb-24">
            <Link to="/search">
              <PrimaryButton label="Find By District"></PrimaryButton>
            </Link>
          </div>
        </ResponsiveContainer>
      </FullScreen>
      <Tab></Tab>
    </>
  );
}
