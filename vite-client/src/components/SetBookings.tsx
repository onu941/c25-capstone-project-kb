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
        `${import.meta.env.VITE_API_SERVER}/bookings/user/${reduxUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const bookingsData = await response.json();
      console.log(bookingsData);
    };

    fetchUserBookings();
  }, []);

  return (
    <div className="flex flex-row w-full md:pt-10 pt-6 place-content-center">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-2 w-fit mb-24 md:mb-0">
        <BookingCard
          key={1}
          date={25}
          month={"May"}
          year={2023}
          name={`Greatest Partyroom 1`}
          time={"19:00"}
          pax={10}
          address={"18 Tung Chung Waterfront Rd"}
        />
      </div>
    </div>
  );
}
