import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { SettingsTabButton } from "./Buttons";
import { SettingTabProps } from "../../app/interface";

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

export function SettingsTab(props: SettingTabProps) {
  return (
    <div className="tabs mt-5 mb-6 w-full flex place-content-around">
      <SettingsTabButton
        onClick={() => props.handleClick("bookings")}
        name="Bookings"
        isSelected={props.isSelected === "bookings"}
      />
      <SettingsTabButton
        onClick={() => props.handleClick("rooms")}
        name="Rooms"
        isSelected={props.isSelected === "rooms"}
      />
      <SettingsTabButton
        onClick={() => props.handleClick("general")}
        name="General"
        isSelected={props.isSelected === "general"}
      />
    </div>
  );
}

export function BookingsTab(props: SettingTabProps) {
  return (
    <div className="tabs mt-5 mb-6 w-full flex place-content-around">
      <SettingsTabButton
        onClick={() => props.handleClick("partygoer")}
        name="As Partygoer"
        isSelected={props.bookingsTabIsSelected === "partygoer"}
      />
      <SettingsTabButton
        onClick={() => props.handleClick("host")}
        name="As Host"
        isSelected={props.bookingsTabIsSelected === "host"}
      />
    </div>
  );
}

export function NewRoomTab(props: SettingTabProps) {
  return (
    <div className="tabs mt-5 mb-6 w-full flex place-content-around">
      <SettingsTabButton
        onClick={() => props.handleClick("part_1")}
        name="Part 1"
        isSelected={props.isSelected === "part_1"}
      />
      <SettingsTabButton
        onClick={() => props.handleClick("part_2")}
        name="Part 2"
        isSelected={props.isSelected === "part_2"}
      />
    </div>
  );
}
