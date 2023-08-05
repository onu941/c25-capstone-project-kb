import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { SettingsTabButton } from "./Buttons";

export interface SettingTabProps {
  handleClick: (string: string) => void;
  isSelected?: string;
  bookingsTabIsSelected?: string;
}

export function Tab() {
  const navigate = useNavigate();

  return (
    <div className="z-20 fixed bottom-0 columns-3 flex justify-around w-full py-4 bg-slate-800 border-solid border-t-slate-600 border-opacity-60 border-2 border-transparent">
      <div>
        <button onClick={() => navigate(`/submit_room`)}>
          <PlusCircleIcon className="h-8 w-8 text-slate-300 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-125"></PlusCircleIcon>
        </button>
      </div>
      <div>
        <button onClick={() => navigate(`/landing`)}>
          <HomeIcon className="h-8 w-8 text-slate-300 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-125"></HomeIcon>
        </button>
      </div>
      <div>
        <button onClick={() => navigate(`/search`)}>
          <MagnifyingGlassIcon className="h-8 w-8 text-slate-300 drop-shadow-lg transform transition duration-200 ease-in-out hover:scale-125"></MagnifyingGlassIcon>
        </button>
      </div>
    </div>
  );
}

export function SettingsTab({ handleClick, isSelected }: SettingTabProps) {
  return (
    <div className="tabs mt-5 mb-6 w-full flex place-content-around">
      <SettingsTabButton
        onClick={() => handleClick("bookings")}
        name="Bookings"
        isSelected={isSelected === "bookings"}
      />
      <SettingsTabButton
        onClick={() => handleClick("rooms")}
        name="Rooms"
        isSelected={isSelected === "rooms"}
      />
      <SettingsTabButton
        onClick={() => handleClick("general")}
        name="General"
        isSelected={isSelected === "general"}
      />
    </div>
  );
}

export function BookingsTab({
  handleClick,
  bookingsTabIsSelected,
}: SettingTabProps) {
  return (
    <div className="tabs mt-5 mb-6 w-full flex place-content-around">
      <SettingsTabButton
        onClick={() => handleClick("partygoer")}
        name="As Partygoer"
        isSelected={bookingsTabIsSelected === "partygoer"}
      />
      <SettingsTabButton
        onClick={() => handleClick("host")}
        name="As Host"
        isSelected={bookingsTabIsSelected === "host"}
      />
    </div>
  );
}

export function NewRoomTab({ handleClick, isSelected }: SettingTabProps) {
  return (
    <div className="tabs mt-5 mb-6 w-full flex place-content-around">
      <SettingsTabButton
        onClick={() => handleClick("part_1")}
        name="Part 1"
        isSelected={isSelected === "part_1"}
      />
      <SettingsTabButton
        onClick={() => handleClick("part_2")}
        name="Part 2"
        isSelected={isSelected === "part_2"}
      />
    </div>
  );
}
