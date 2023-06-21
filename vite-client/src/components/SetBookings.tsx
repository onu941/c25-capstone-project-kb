import { Link, useNavigate } from "react-router-dom";
import { BookingCard } from "./minicomponents/Cards";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Booking, BookingInSettings } from "../app/interface";
import { BookingsTab } from "./minicomponents/Tab";
import { useAppDispatch } from "../app/hook";
import { bookingsTab as bookingsTabSlice } from "../redux/userSlice";

export function SetBookings() {
  const navigate = useNavigate();
  const [userBookings, setUserBookings] = useState<BookingInSettings[]>([]);
  const [hostBookings, setHostBookings] = useState<BookingInSettings[]>([]);
  const [noUserBookings, setNoUserBookings] = useState<boolean>(false);
  const [noHostBookings, setNoHostBookings] = useState<boolean>(false);

  const bookingsTab = useSelector((state: RootState) => state.user.bookingsTab);
  const dispatch = useAppDispatch();
  const handleClick = (string: string) => {
    dispatch(bookingsTabSlice(string));
  };

  useEffect(() => {
    const fetchUserBookings = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/booking/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const bookingsData = await response.json();
      console.log("bookingsData as user", bookingsData);
      if (bookingsData.length == 0) setNoUserBookings(true);
      const bookingsTreated = bookingsData.map(
        (booking: BookingInSettings) => ({
          ...booking,
          booking_date: new Date(booking.booking_date).toLocaleString("en-US", {
            timeZone: "Asia/Hong_Kong",
          }),
          start_time: booking.start_time.slice(0, -3),
        })
      );
      console.log("bookingsTreated:", bookingsTreated);
      setUserBookings(bookingsTreated);
    };

    const fetchHostBookings = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/booking/settings_host`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const hostData = await response.json();
      console.log("bookingsData as host", hostData);

      if (hostData.length == 0) setNoHostBookings(true);
      const hostTreated = hostData.map((booking: BookingInSettings) => ({
        ...booking,
        booking_date: new Date(booking.booking_date).toLocaleString("en-US", {
          timeZone: "Asia/Hong_Kong",
        }),
        start_time: booking.start_time.slice(0, -3),
      }));

      console.log("host bookings:", hostTreated);
      setHostBookings(hostTreated);
    };

    fetchUserBookings();
    fetchHostBookings();
  }, []);

  console.log("no user bookings", noUserBookings);
  console.log("no host bookings", noHostBookings);
  return (
    <>
      <BookingsTab
        handleClick={handleClick}
        bookingsTabIsSelected={bookingsTab}
      />
      <div className="flex flex-row w-full md:pt-10 pt-6 place-content-center mb-36">
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-2 w-fit md:mb-0">
          {bookingsTab === "partygoer" &&
            !noUserBookings &&
            userBookings!.map((booking) => (
              <div className="mx-4" key={booking.id}>
                <BookingCard
                  id={booking.id}
                  name={booking.name}
                  time={booking.start_time}
                  pax={booking.headcount}
                  address={booking.address}
                  year={booking.booking_date.split(/[\/\s,:]+/)[2]}
                  month={new Date(
                    2000,
                    parseInt(booking.booking_date.split(/[\/\s,:]+/)[0], 10) - 1
                  ).toLocaleString("default", { month: "short" })}
                  date={booking.booking_date.split(/[\/\s,:]+/)[1]}
                  onClick={() => {
                    navigate(`/booking?booking_id=${booking.id}`);
                  }}
                />
              </div>
            ))}
          {bookingsTab === "partygoer" && noUserBookings && (
            <div className="text-slate-300 text-lg">
              No bookings as partygoer
            </div>
          )}
          {bookingsTab === "host" &&
            !noHostBookings &&
            hostBookings.map((booking) => (
              <div className="mx-4" key={booking.id}>
                <BookingCard
                  id={booking.id}
                  name={booking.name}
                  time={booking.start_time}
                  pax={booking.headcount}
                  address={booking.address}
                  year={booking.booking_date.split(/[\/\s,:]+/)[2]}
                  month={new Date(
                    2000,
                    parseInt(booking.booking_date.split(/[\/\s,:]+/)[0], 10) - 1
                  ).toLocaleString("default", { month: "short" })}
                  date={booking.booking_date.split(/[\/\s,:]+/)[1]}
                  onClick={() => {
                    navigate(`/booking?booking_id=${booking.id}`);
                  }}
                />
              </div>
            ))}
          {bookingsTab === "host" && noHostBookings && (
            <div className="text-slate-300 text-lg">No bookings as host</div>
          )}
        </div>
      </div>
    </>
  );
}
