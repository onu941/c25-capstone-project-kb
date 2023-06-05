import { Link } from "react-router-dom";
import { PartyroomCard } from "./minicomponents/Cards";
import { FullScreen } from "./minicomponents/Containers";

export function SetRooms() {
  return (
    <FullScreen>
      <Link to="/partyroom">
        <PartyroomCard name="Partyroom Name" address="Address" />
      </Link>
    </FullScreen>
  );
}
