import {
  HomeIcon,
  MagnifyingGlassIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { SettingsTabButton } from "./Buttons";

interface SettingTabProps {
  handleClick: (string: string) => void;
  isSelected?: string;
}

export function Tab() {
  return (
    <div className="z-50 fixed bottom-0 columns-3 flex justify-around w-full py-4 dark:bg-slate-600">
      <div>
        <Link to="/new_room">
          <PlusCircleIcon className="h-8 w-8 text-slate-300"></PlusCircleIcon>
        </Link>
      </div>
      <div>
        <Link to="/landing">
          <HomeIcon className="h-8 w-8 text-slate-300"></HomeIcon>
        </Link>
      </div>
      <div>
        <Link to="/search">
          <MagnifyingGlassIcon className="h-8 w-8 text-slate-300"></MagnifyingGlassIcon>
        </Link>
      </div>
    </div>
  );
}

export function SettingsTab(props: SettingTabProps) {
  return (
    <div className="tabs mt-5 mb-12 w-full flex place-content-around">
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

export function NewRoomTab(props: SettingTabProps) {
  return (
    <div className="tabs mt-5 mb-12 w-full flex place-content-around">
      <SettingsTabButton
        onClick={() => props.handleClick("basics")}
        name="Part 1: Basic Info"
        isSelected={props.isSelected === "basics"}
      />
      <SettingsTabButton
        onClick={() => props.handleClick("photoconfirm")}
        name="Part 2: Photos & Confirm"
        isSelected={props.isSelected === "photoconfirm"}
      />
    </div>
  );
}
