import { useNavigate } from "react-router-dom";
import { PartyroomCard } from "./minicomponents/Cards";
import { useEffect, useState } from "react";

export interface PartyroomInSettings {
  id: number;
  name: string;
  host_id: number;
  address: string;
  is_hidden: boolean;
}

export function SetRooms() {
  const navigate = useNavigate();
  const [userPartyrooms, setUserPartyrooms] = useState<PartyroomInSettings[]>(
    []
  );
  const [noRooms, setNoRooms] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserPartyrooms = async () => {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_SERVER}/partyroom/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const partyroomsData = await response.json();
      if (partyroomsData.length == 0) setNoRooms(true);
      setUserPartyrooms(partyroomsData);
    };

    fetchUserPartyrooms();
  }, []);

  return (
    <div className="flex flex-row w-full md:pt-10 pt-6 place-content-center">
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-2 w-fit mb-24 md:mb-0">
        {!noRooms ? (
          userPartyrooms.map((partyroom) => (
            <div className="mx-4" key={partyroom.id}>
              <PartyroomCard
                name={partyroom.name}
                address={partyroom.address}
                onClick={() => {
                  navigate(`/partyroom?room_id=${partyroom.id}`);
                }}
              />
            </div>
          ))
        ) : (
          <div className="mx-4">No rooms yet</div>
        )}
      </div>
    </div>
  );
}
