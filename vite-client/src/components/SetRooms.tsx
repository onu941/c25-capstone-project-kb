import { useNavigate } from "react-router-dom";
import { PartyroomCard } from "./minicomponents/Cards";
import { useEffect, useState } from "react";
import { PartyroomInSettings } from "../app/interface";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export function SetRooms() {
  const reduxUserId = useSelector((state: RootState) => state.auth.user_id);
  const navigate = useNavigate();
  const [userPartyrooms, setUserPartyrooms] = useState<PartyroomInSettings[]>(
    []
  );

  useEffect(() => {
    const fetchUserPartyrooms = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/partyroom/user/${reduxUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const partyroomsData = await response.json();
      setUserPartyrooms(partyroomsData);
    };

    fetchUserPartyrooms();
  }, []);

  return (
    <div className="flex flex-row w-full md:pt-10 pt-6 place-content-center">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-2 w-fit mb-24 md:mb-0">
        {userPartyrooms.map((partyroom) => (
          <div className="mx-4">
            <PartyroomCard
              id={partyroom.id}
              name={partyroom.name}
              address={partyroom.address}
              onClick={() => {
                navigate(`/partyroom?room_id=${partyroom.id}`);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
