import { Link, useNavigate } from "react-router-dom";
import { BookingCard } from "./minicomponents/Cards";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { BookingInSettings } from "../app/interface";

export function SetBookings() {
  const reduxUserId = useSelector((state: RootState) => state.auth.user_id);
  const navigate = useNavigate();
  const [userBookings, setUserBookings] = useState<BookingInSettings[]>([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/booking/user/${reduxUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const bookingsData = await response.json();

      const bookingsWithFixedDateString = bookingsData.map(
        (booking: BookingInSettings) => ({
          ...booking,
          booking_date: new Date(booking.booking_date).toLocaleString("en-US", {
            timeZone: "Asia/Hong_Kong",
          }),
        })
      );
      setUserBookings(bookingsWithFixedDateString);
    };

    fetchUserBookings();
  }, []);

  return (
    <div className="flex flex-row w-full md:pt-10 pt-6 place-content-center mb-36">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-2 w-fit md:mb-0">
        {userBookings.map((booking) => (
          <div className="mx-4">
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
      </div>
    </div>
  );
}
