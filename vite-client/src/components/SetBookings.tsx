import { Link } from "react-router-dom";
import { BookingCard } from "./minicomponents/Cards";
import { FullScreen } from "./minicomponents/Containers";

export function SetBookings() {
  // you will use a map fn later on, the current Array.from method is just a placeholder
  const numBookings = 5; // change as needed
  const bookings = Array.from({ length: numBookings }, (_, i) => (
    <div className="m-4">
      <Link to="/booking">
        <BookingCard
          key={i}
          date={25}
          month={"May"}
          year={2023}
          name={`Greatest Partyroom ${i + 1}`}
          time={"19:00"}
          pax={10}
          address={"18 Tung Chung Waterfront Rd"}
        />
      </Link>
    </div>
  ));
  return <FullScreen>{bookings}</FullScreen>;
}
