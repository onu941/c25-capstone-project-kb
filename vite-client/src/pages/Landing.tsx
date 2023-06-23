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
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { BookingCard, RandomLandingRooms } from "../app/interface";
import jwtDecode from "jwt-decode";

export interface JWT {
  id: number;
  iat: number;
  exp: number;
}

export default function Landing() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded: JWT = jwtDecode(token!);
  // console.log("decoded:", decoded);
  const jwtUserId = decoded.id;
  console.log("jwtUserId:", jwtUserId);
  const reduxUserId = useSelector((state: RootState) => state.auth.user_id);
  console.log("reduxUserId", reduxUserId);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [noBookingsAsPartygoer, setNoBookingsAsPartygoer] =
    useState<boolean>(false);
  const [noBookingsAsHost, setNoBookingsAsHost] = useState<boolean>(false);
  const [partygoerDetails, setPartygoerDetails] = useState<BookingCard>({
    id: NaN,
    person_id: Number(jwtUserId),
    headcount: NaN,
    booking_date: "",
    start_time: "",
    name: "",
    address: "",
    image_filename: "",
  });
  const [hostDetails, setHostDetails] = useState<BookingCard>({
    id: NaN,
    person_id: Number(jwtUserId),
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
          },
        }
      );

      const bookingDetails = await response.json();
      if (bookingDetails.id == -1) {
        setNoBookingsAsPartygoer(true);
        return;
      }
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
      if (bookingDetails.id == -1) {
        setNoBookingsAsHost(true);
        return;
      }
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

      console.log("finding image urls:", bookingDetailsTreated);

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
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-2 px-4 md:px-0">
            <div>
              <BodyHeader title="Your next booking:"></BodyHeader>
              {!noBookingsAsPartygoer ? (
                <>
                  <BookingCardLarge
                    image={`${import.meta.env.VITE_API_SERVER}/rooms/${
                      partygoerDetails.image_filename
                    }`}
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
                  <div className="grid place-content-center place-items-center pt-10">
                    <PrimaryButton label="See All Bookings (Partygoer)" />
                  </div>
                </>
              ) : (
                <div className="w-full h-60 rounded-lg flex place-content-center py-24 text-slate-300 text-xl bg-slate-800 bg-opacity-50 border-solid border-2 border-slate-700 border-opacity-50">
                  No bookings yet
                </div>
              )}
            </div>
            <div>
              <div>
                <BodyHeader
                  title={
                    noBookingsAsHost
                      ? "Get booked as a host!"
                      : "Your room has been booked!"
                  }
                ></BodyHeader>
                {!noBookingsAsHost ? (
                  <>
                    <BookingCardLarge
                      image={`${import.meta.env.VITE_API_SERVER}/rooms/${
                        hostDetails.image_filename
                      }`}
                      onClick={() =>
                        navigate(`/booking?booking_id=${hostDetails.id}`)
                      }
                      alt={hostDetails.image_filename}
                      name={hostDetails.name}
                      address={hostDetails.address}
                      time={hostDetails.start_time}
                      date={hostDetails.booking_date.split(/[\/\s,:]+/)[1]}
                      month={new Date(
                        2000,
                        parseInt(
                          hostDetails.booking_date.split(/[\/\s,:]+/)[0],
                          10
                        ) - 1
                      ).toLocaleString("default", { month: "short" })}
                      pax={hostDetails.headcount}
                    />
                    <div className="grid md:grid-cols-2 grid-cols-1 place-content-center place-items-center pt-10">
                      <Link to="/submit_room">
                        <PrimaryButton label="Submit a New Room" />
                      </Link>
                      <PrimaryButton label="See All Bookings (Host)" />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-60 rounded-lg flex place-content-center py-24 text-slate-300 text-xl bg-slate-800 bg-opacity-50 border-solid border-2 border-slate-700 border-opacity-50">
                    No rooms registered with us yet
                  </div>
                )}
              </div>
            </div>
          </div>
          <hr className="md:mx-0 mx-8 my-6 border-slate-500"></hr>
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
